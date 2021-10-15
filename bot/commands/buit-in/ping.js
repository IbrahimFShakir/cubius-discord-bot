module.exports = {
    description: "Replies with Pong!", 
    usage: "/ping", 
    availability: GUILD_AND_USER, 
    async use(interaction) {
        await interaction.reply('Pong!');
    }
}