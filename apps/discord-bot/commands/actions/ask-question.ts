import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { ActionRowBuilder, ButtonBuilder } from "discord.js";
import { client } from '../..';


module.exports = {
data: new SlashCommandBuilder().setName('ask-question').setDescription('This command asks a funny question and enables you interaction !'),
async execute(interaction:ChatInputCommandInteraction){


const row = new ActionRowBuilder<ButtonBuilder>().addComponents([new ButtonBuilder({'label':'Yes','style':3,'customId':'yes'}).setEmoji('👍'), new ButtonBuilder({'label':'No','style':4,'customId':'no'}).setEmoji('☠️')]);
    try {
   const message =  await interaction.reply({
            content:'Is Web3Builders the best community of blockchain devs in the world ?',
            components: [row],
            withResponse: true
        });

        const collectorFilter = (i: any) => i.user.id === interaction.user.id;
const confirmation = await message.resource?.message?.awaitMessageComponent({ filter: collectorFilter, time: 60000 });

if(!confirmation){
    await interaction.editReply({ content: 'You did not answer in time!' });
    return;
}

        if (confirmation?.customId === 'yes') {
            await confirmation.update({content:`${confirmation.user.username} said: ${confirmation.customId}, please check your DM 😅`, components: []});
            await client.users.send(interaction.user.id, {content:`Hell yeah mate 👍 ! That's the right way to go !`});
        } else {
            await confirmation.update({content:`${confirmation.user.username} said: ${confirmation.customId}`,  components: []});
             await client.users.send(interaction.user.id, {content:`If you want to stay alive, please leave the community ! Immediately ! 😅 NOW ! (LMAO Nah, stay, but give us feedback what's not right).`});
        }

        
    } catch (error) {
        console.error(error);
        await interaction.editReply({ content: 'There was an error while executing this command !',  components: []});
    }


},

}