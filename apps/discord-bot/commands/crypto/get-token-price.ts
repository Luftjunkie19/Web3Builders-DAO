import {  ChannelType, ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const data = new SlashCommandBuilder()
.setName('get-token-price')
.setDescription('Get the owner of the server')
.addStringOption(option =>
      option.setName('pair')
        .setDescription('The trading pair like ETHBTC or BTCUSDT')
        .setRequired(true)
    ).addChannelOption(option => option.setName('channel').addChannelTypes(ChannelType.GuildText).setDescription('The channel to send the message').setRequired(true));

module.exports = {
    cooldown:20,
    data: data,
    async execute(interaction:ChatInputCommandInteraction
) {
try{

    const pair = interaction.options.getString('pair');

    const cryptoPriceTickerRequest = await fetch(`https://api.api-ninjas.com/v1/cryptoprice?symbol=${pair}`, {
        headers:{
            'X-Api-Key':process.env.NINJAS_API_KEY as string,
        }
    });
    const cryptoPriceTicker = await cryptoPriceTickerRequest.json();

    if(!cryptoPriceTicker) {
        return await interaction.reply(`No price found for ${pair}`);
    };


    await interaction.reply(`The price on ${cryptoPriceTicker.symbol} pair is ${Number(cryptoPriceTicker.price).toFixed(2)} !`);
}
catch(error) {
    console.error(`Error executing ${interaction}:`, error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
}
}