import {  SlashCommandBuilder } from 'discord.js';

const data = new SlashCommandBuilder()
.setName('welcome_message')
.setDescription('Set the welcome message');

module.exports = {
    data: data,
    async execute(interaction:any) {
try{
    await interaction.followUp('Hello this is a test-bot message 😎!');
}
catch(error) {
    console.error(`Error executing ${interaction}:`, error);
    }
}
}