import {  SlashCommandBuilder } from 'discord.js';
import { Collection } from 'discord.js';

const data = new SlashCommandBuilder()
.setName('who-is_owner')
.setDescription('Get the owner of the server');

module.exports = {
    cooldown:20,
    data: data,
    async execute(interaction:any
) {

    // const {cooldowns} = interaction.client;

    // console.log(interaction);

// if(!cooldowns.has(interaction.commandName)) {
//     cooldowns.set(interaction.commandName, new Collection());
// }

// const now = Date.now();
// const timestamps = cooldowns.get(interaction.commandName);
// const cooldownAmount = () => interaction.command.cooldown ;

// if(timestamps.has(interaction.user.id)) {
//     const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount();
//     if(now < expirationTime) {
//         const timeLeft = (expirationTime - now) / 1000;
//         return interaction.reply(`Ey du dumbass, you need to wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${interaction.commandName}\`. Arschkopf !`);
//     }
// }
// timestamps.set(interaction.user.id, now);
// setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount());

try{
    await interaction.reply(`The owner of this server is: ${interaction.member.user.globalName}`);
}
catch(error) {
    console.error(`Error executing ${interaction}:`, error);
    }
}
}