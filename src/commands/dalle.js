const { EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder, IntegrationApplication } = require('discord.js');
const checkChatId = require('./utils/checkChatId');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dalle')
		.setDescription('replies with dalle generated images using user prompt')
        .addStringOption(option =>
			option
				.setName('prompt')
				.setDescription('Enter a prompt for dalle')
                .setRequired(true)),
	async execute(interaction, openai) {
        if (!checkChatId.isAiChat(interaction)) {
            await interaction.reply('Wrong chat homie. Use #ai-shit');
            return;
        }
        await interaction.deferReply();
        const prompt = interaction.options.getString('prompt');
        fetchResponse(interaction, openai)
            .then(response => {
                const image_url = response.data.data[0].url;
                const embed = new EmbedBuilder()
                    .setTitle("Prompt: " + prompt)
                    .setImage(image_url);
                interaction.editReply({ embeds: [embed] });
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