import {  ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

const data = new SlashCommandBuilder()
.setName('who-is_owner')
.setDescription('Get the owner of the server');

module.exports = {
    data: data,
    async execute(interaction:any
) {
try{
    await interaction.followUp(`The owner of this server is: ${interaction.member.user.globalName}`);
}
catch(error) {
    console.log("Start of the world", interaction.member.user.globalName, "End of the world");
    console.error(`Error executing ${interaction}:`, error);
    }
}
}