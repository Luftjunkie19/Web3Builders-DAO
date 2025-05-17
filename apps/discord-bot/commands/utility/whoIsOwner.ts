import {  SlashCommandBuilder } from 'discord.js';


const data = new SlashCommandBuilder()
.setName('who-is_owner')
.setDescription('Get the owner of the server');

module.exports = {
    cooldown:10,
    data: data,
    async execute(interaction:any
) {
try{
    await interaction.reply(`The owner of this server is: ${interaction.member.user.globalName}, ${interaction.member.joinedAt}`);
}
catch(error) {
    console.error(`Error executing ${interaction}:`, error);
    }
}
}