const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {

});

client.login('ODk3NjY0ODcxODA0NTg4MDcy.YWY9jw.OIprDa1brKt2GXjd2XDP8IkD4qY');