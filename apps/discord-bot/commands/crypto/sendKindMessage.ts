import {  ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder } from 'discord.js';
import dotenv from 'dotenv';
import { client } from '../..';
dotenv.config();

const data = new SlashCommandBuilder()
.setName('send-kind-message')
.setDescription('This bot sends you a kind message :)')
.addStringOption(option =>
      option.setName('choice')
        .setDescription('The token/coin we want to get the price of')
        .setRequired(true).addChoices({ name: 'ETH', value: 'ETH' }, { name: 'BTC', value: 'BTC' })
    );

module.exports = {
    cooldown:20,
    data: data,
execute: async (interaction:any)=> {
try{
    const choice = interaction.options.getString('choice');

    if(choice === 'ETH'){
        await client.users.send(interaction.user.id, {content:`Śmierdzą Ci Stopy !`});
    }else{
        await client.users.send(interaction.user.id, {content:`Miłego Dnia, Luftie !`});
    }


await interaction.reply({content:`Check you DM !`, flags:MessageFlags.Ephemeral});
}
catch(error) {
    console.error(`Error executing ${interaction}:`, error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
}
}