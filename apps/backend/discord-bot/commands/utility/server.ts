import {  SlashCommandBuilder } from 'discord.js';

module.exports = {
    data: new SlashCommandBuilder().setName('server')
        .setDescription('Get server information'),
    async execute(interaction:any
    ) {
        if(!interaction.guild) return;
        await interaction.reply(`Server name: ${interaction.guild.name}\nMember count: ${interaction.guild.memberCount}`);
    }
}