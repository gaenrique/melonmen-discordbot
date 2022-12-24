const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dalle')
		.setDescription('replies with dalle generated images using user prompt'),
	async execute(interaction, openai) {
        const response = dalle_request(openai);
		await interaction.reply('Done');
	},
};

async function dalle_request(openai) {
    const response = await openai.listModels();
    const json = JSON.parse(response);
    console.log(json.data);
}