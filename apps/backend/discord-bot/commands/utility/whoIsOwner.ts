import {  ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

const data = new SlashCommandBuilder()
.setName('who-is_owner')
.setDescription('Get the owner of the server');

module.exports = {
    data: data,
    async execute(interaction:any
) {
try{
    await interaction.followUp(`The owner of this server is: ${interaction.guild?.members.me}`);
}
catch(error) {
    console.error(`Error executing ${interaction}:`, error);
    }
}
}