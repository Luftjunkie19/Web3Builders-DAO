import {  APIApplicationCommandOptionChoice, ButtonBuilder, ButtonStyle, ChannelType, ChatInputCommandInteraction, ComponentBuilder, MessageFlags, RestOrArray, SlashCommandBuilder } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const data = new SlashCommandBuilder()
.setName('vote-proposal')
.setDescription('Vote a proposal with your voting power !')
.addStringOption(option => option.setName('proposal-id')
.setDescription('Pass the proposal id, you want to vote for.')
.setRequired(true));

module.exports = {
    cooldown:20,
    data: data,
    async execute(interaction:ChatInputCommandInteraction
) {
try{
   
    

   const proposalId = interaction.options.getString('proposal-id');
    const member = interaction.options.getUser('member');

    if(!proposalId || (proposalId && !proposalId.startsWith('0x') && proposalId.length !== 42)){
        await interaction.reply({content:`Invalid proposal id.`, flags:MessageFlags.Ephemeral });
        return;
    }


    const proposalRequest = await fetch(`${process.env.BACKEND_ENDPOINT}/governance/get_proposal_details/${proposalId}`, {
        method: 'GET',
        headers: {
            'x-backend-eligibility': process.env.DISCORD_BOT_INTERNAL_SECRET as string,
        },
    });

    const proposalResponse = await proposalRequest.json();

    if(!proposalResponse || proposalResponse.error){
        await interaction.reply({content:proposalResponse.error, flags:MessageFlags.Ephemeral });
        return;
    }

    if(!member){
        await interaction.reply({content:`No user found with the nickname given.`, flags:MessageFlags.Ephemeral });
        return;
    }
    
    const request = await fetch(`${process.env.BACKEND_ENDPOINT}/gov_token/influence/${member.id}`);

   const response = await request.json();
   
   console.log(response);

   if(!response || response.error){
 await interaction.reply({content:response.error, flags:MessageFlags.Ephemeral });
return;
}

if(Number(response.tokenAmount) === 0 || !response.tokenAmount){
    await interaction.reply({content:`You don't have any voting power.`, flags:MessageFlags.Ephemeral });
return;
}

const delegateTokens= new ButtonBuilder().setCustomId('delegate-tokens').setLabel('Delegate').setStyle(ButtonStyle.Primary);




}
catch(error) {
    console.error(`Error executing ${interaction}:`, error);
    await interaction.reply({ content: 'There was an error while executing this command!'});
    }
}
}