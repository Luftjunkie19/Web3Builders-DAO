import {  AutocompleteInteraction, ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder } from 'discord.js';
import dotenv from 'dotenv';
import { client } from '../..';
dotenv.config();

const data = new SlashCommandBuilder()
.setName('autocomplete-test')
.setDescription('Test automplete')
.addStringOption(option =>
      option.setName('choice')
        .setDescription('The autocomplete choice we want to get').setAutocomplete(true)
    );

module.exports = {
    cooldown:20,
    data: data,
    async autocomplete(interaction:AutocompleteInteraction) {
        const focusedValue = interaction.options.getFocused();
        const choices = ['ETH', 'BTC'];
        const filtered = choices.filter((choice) => choice.startsWith(focusedValue));
        await interaction.respond(
            filtered.map((choice) => ({ name: choice, value: choice })),
        );
        
    },
   async execute(interaction:ChatInputCommandInteraction
) {
try{
    const choice = interaction.options.getString('choice');


    await interaction.reply({content:`${choice}`, flags:MessageFlags.Ephemeral});
}

catch(error) {
    console.error(`Error executing ${interaction}:`, error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
}
}