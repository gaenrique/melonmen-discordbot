const { SlashCommandBuilder, IntegrationApplication } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dalle')
		.setDescription('replies with dalle generated images using user prompt')
        .addStringOption(option =>
			option
				.setName('prompt')
				.setDescription('Enter a prompt for dalle')),
	async execute(interaction, openai) {
        await interaction.deferReply();
        fetchResponse(interaction, openai)
            .then(response => {
                const image_url = response.data.data[0].url;
                interaction.editReply(image_url);
            })
            .catch(error => {
                interaction.editReply(error.response.statusText);
            });
	},
};

async function fetchResponse(interaction, openai) {
    return await openai.createImage({
        prompt: interaction.options.getString('prompt'),
        n: 1,
        size: "512x512",
    });
}