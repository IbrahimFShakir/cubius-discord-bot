exports.registerCommmands = () => {
    const { REST } = require('@discordjs/rest');
    const { Routes } = require('discord-api-types/v9');

    const commands = [];
    require('./utility/walker').walk(require('path').join(__dirname, "/commands")).forEach(commandFiles => {
      const command = require(commandFiles);
      commands.push(command.data.toJSON());
    });
    
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

exports.init = () => {
    const { Client, Collection, Intents } = require('discord.js');
    const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

    client.commands = new Collection();
    require('./utility/walker').walk(require('path').join(__dirname, "/commands")).forEach(commandFile => {
      const command = require(commandFile);
      client.commands.set(command.data.name, command);
    });

    client.once('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
      });
      
    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        try { await command.execute(interaction); } 
        catch (error) {
          await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
        };
      });

    client.login(process.env.DISCORD_CLIENT_TOKEN);
}