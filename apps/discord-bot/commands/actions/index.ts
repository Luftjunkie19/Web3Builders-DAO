import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { ActionRowBuilder, ButtonBuilder } from "discord.js";


module.exports = {
data: new SlashCommandBuilder().setName('ask-question').setDescription('Reloads the bot'),
async execute(interaction:ChatInputCommandInteraction){


const row = new ActionRowBuilder<ButtonBuilder>().addComponents([new ButtonBuilder({'label':'Yes','style':3,'customId':'yes'}).setEmoji('👍'), new ButtonBuilder({'label':'No','style':4,'customId':'no'}).setEmoji('☠️')]);



    try {
   const message =  await interaction.reply({
            content:'Does Jobited has the best team ever ?',
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
            await interaction.followUp({ content: 'Hell yeah buddy, thats the right way to go 🚬' });
            await confirmation.update({content:`${confirmation.user.username} said: ${confirmation.customId}`, components: []});
        } else {
            await confirmation.update({content:`${confirmation.user.username} said: ${confirmation.customId}`,  components: []});
            await interaction.followUp({ content: '😅 Haha, 🤣 Haha....., Geh und bring dich um ☠️' });
        }

        
    } catch (error) {
        console.error(error);
        await interaction.editReply({ content: 'There was an error while reloading a command!',  components: []});
    }


},

}