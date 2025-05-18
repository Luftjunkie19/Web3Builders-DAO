import {  SlashCommandBuilder } from 'discord.js';
import { client } from '../..';


const data = new SlashCommandBuilder()
.setName('who-is_owner')
.setDescription('Get the owner of the server');


module.exports = {
    cooldown:10,
    data: data,
    async execute(interaction:any
) {
try{
    console.log("Guild interaction", interaction, "Guild interaction");
  
    await interaction.reply(`The owner of this server is: ${interaction.member.user.globalName}, ${interaction.member.joinedAt}`);
}
catch(error) {
    console.error(`Error executing ${interaction}:`, error);
    }
}
}