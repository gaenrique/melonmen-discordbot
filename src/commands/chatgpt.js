const { SlashCommandBuilder, IntegrationApplication } = require('discord.js');
const { aiChatId } = require('../../config.json')
const checkChatId = require('./utils/checkChatId');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chatgpt')
		.setDescription('OpenAIs text completion API')
        .addStringOption(option =>
			option
				.setName('prompt')
				.setDescription('Enter a prompt for the davinci model')
                .setRequired(true)),
	async execute(interaction, openai) {
        if (!checkChatId.isAiChat(interaction)) {
            await interaction.reply(`Wrong chat homie. Use <#${aiChatId}>`);
            return;
        }
        await interaction.deferReply();
        const prompt = interaction.options.getString('prompt');
        fetchResponse(interaction, openai)
            .then(response => {
                interaction.editReply("Prompt: " + prompt + "\n\n" 
                    + "Response: " + response.data.choices[0].text);
            })
            .catch(error => {
                interaction.editReply(error.response.statusText);
            });
	},
};

async function fetchResponse(interaction, openai) {
    return await openai.createCompletion({
        model: "text-davinci-003",
        prompt: interaction.options.getString('prompt'),
        max_tokens: 1000,
        temperature: 0.5,
    });
}