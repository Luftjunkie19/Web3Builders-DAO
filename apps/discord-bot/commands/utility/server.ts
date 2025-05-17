import {  ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

module.exports = {
    cooldown:15,
    data: new SlashCommandBuilder().setName('server')
        .setDescription('Get server information'),
    async execute(interaction:ChatInputCommandInteraction
    ) {
        if(!interaction.guild) return;
        await interaction.reply(`Server name: ${interaction.guild.name}\nMember count: ${interaction.guild.memberCount}`);
    }
}