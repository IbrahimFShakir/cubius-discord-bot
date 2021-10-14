exports.start = () => {
    const { Client, Intents } = require('discord.js');
    const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

    client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    });

    client.on('interactionCreate', async interaction => {
        
    });

    client.login(process.env.DISCORD_TOKEN);
}