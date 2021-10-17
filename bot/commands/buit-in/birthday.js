const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('birthday')
        .setDescription('Set your birthday then wait for an awesome \"Happy birthday\" day.')
        .addStringOption(option => option.setName('day').setDescription('The day of your birthday.').setRequired(true))
        .addStringOption(option => option.setName('month').setDescription('The month of your birthday.')
                .addChoice('[01] January',   'jan')
                .addChoice('[02] February',  'feb')
                .addChoice('[03] March',     'mar')
                .addChoice('[04] April',     'apr')
                .addChoice('[05] May',       'may')
                .addChoice('[06] June',      'jun')
                .addChoice('[07] July',      'jul')
                .addChoice('[08] August',    'aug')
                .addChoice('[09] September', 'sep')
                .addChoice('[10] October',   'oct')
                .addChoice('[11] November',  'nov')
                .addChoice('[12] December',  'dec')
                .setRequired(true))
        .addStringOption(option => option.setName('year').setDescription('The year of your birthday.').setRequired(false)),  
    async execute(interaction) {
        try { 
            const input = {
                birthday: {
                    day: interaction.options.getString('day'), 
                    month: interaction.options.getString('month'), 
                    year: interaction.options.getString('year')
                }
            };
            require('fs').writeFile(`${__dirname}/../../data/users/${interaction.user.id}.json`, 
                JSON.stringify(input), function(error) { if (error) console.log(error);});
            interaction.reply({ content: "Done.", ephemeral: true });
        } 
        catch (error) {
            interaction.reply({ content: `${error}`, ephemeral: true });
        };
    }
}