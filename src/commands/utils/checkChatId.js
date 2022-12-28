const { aiChatId } = require('../../../config.json')

function isAiChat(interaction) {
    return interaction.channelId == aiChatId;
}

module.exports = { isAiChat };