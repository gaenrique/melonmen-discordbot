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
        console.log(interaction.options.getString('prompt'));
		await interaction.reply('Done');
	},
};

async function dalle_request(openai) {

}