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
        const image_url = await fetchImageUrl(interaction, openai);
        await interaction.editReply(image_url);
	},
};

async function fetchImageUrl(interaction, openai) {
    const response = await openai.createImage({
        prompt: interaction.options.getString('prompt'),
        n: 1,
        size: "512x512",
    });
    return response.data.data[0].url;
}