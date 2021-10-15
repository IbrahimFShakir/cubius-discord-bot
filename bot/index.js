exports.registerCommmands = () => {
    const { REST } = require('@discordjs/rest');
    const { Routes } = require('discord-api-types/v9');
    
    const commands = [{
      name: 'ping',
      description: 'Replies with Pong!'
    }]; 
    
    const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_CLIENT_TOKEN);
    
    (async () => {
      try {
        console.log('Started refreshing application (/) commands.');
    
        await rest.put(
          Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID),
          { body: commands },
        );
    
        console.log('Successfully reloaded application (/) commands.');
      } catch (error) {
        console.error(error);
      }
    })();
}

exports.start = () => {
    const { Client, Intents } = require('discord.js');
    const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

    client.once('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
      });
      
      client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;
      
        const { checkCommand } = require ('./utility/handlers');
        checkCommand(interaction, client);
      });

    client.login(process.env.DISCORD_CLIENT_TOKEN);
}