import { ButtonStyle, ComponentType, MessageFlags, SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from 'discord.js';
import { ActionRowBuilder, ButtonBuilder } from "discord.js";



module.exports = {
data: new SlashCommandBuilder().setName('initial-token-distribution').setDescription('This command allows you as the member of the discord server to receive your initial tokens !'),
async execute(interaction:any){


    const checkAbilityResponse = await fetch(`http://localhost:2137/members/get-member/${interaction.user.id}`);

    const checkAbilityResponseJson = await checkAbilityResponse.json();

    if(!checkAbilityResponseJson || checkAbilityResponseJson.error){ 
        return await interaction.reply({content:checkAbilityResponseJson.error, flags:MessageFlags.Ephemeral});
    }


const customObject:{
    PSR:number,
    JEXS:number,
    W3I:number,
    TKL:number,
    KVTR:number
}={
    PSR:0,
    JEXS:0,
    W3I:0,
    TKL:0,
    KVTR:0
};

let questionsCorrectlyAnswered:number = 0;


const select = new StringSelectMenuBuilder().setCustomId('PSR').setPlaceholder('Select your seniorty in programming (noncommercial + commercial)')
.addOptions(
new StringSelectMenuOptionBuilder().setLabel('<1 year').setValue('0').setEmoji('👶🏼'),
new StringSelectMenuOptionBuilder().setLabel('1-2 years ').setValue('1').setEmoji('👦🏼'),
new StringSelectMenuOptionBuilder().setLabel('3-5 years').setValue('2').setEmoji('🧔🏼'),
new StringSelectMenuOptionBuilder().setLabel('>=5 years').setValue('3').setEmoji('🥷🏼'),
);


const jexsSelect = new StringSelectMenuBuilder().setCustomId('JEXS').setPlaceholder('Select your COMMERCIAL seniorty in programming')
.addOptions(
new StringSelectMenuOptionBuilder().setLabel('<1 year').setValue('0').setEmoji('👻'),
new StringSelectMenuOptionBuilder().setLabel('1-2 years ').setValue('1').setEmoji('👦🏼'),
new StringSelectMenuOptionBuilder().setLabel('3-5 years').setValue('2').setEmoji('🧑🏼‍💻'),
new StringSelectMenuOptionBuilder().setLabel('>=5 years').setValue('3').setEmoji('🥷🏼'),
);

const web3InterestSelect = new StringSelectMenuBuilder().setCustomId('W3I').setPlaceholder('How long are you interested in Web3 (in all fields, not just development) ?')
.addOptions(
new StringSelectMenuOptionBuilder().setLabel('<1 year').setValue('0').setEmoji('🧪'),
new StringSelectMenuOptionBuilder().setLabel('1-2 years ').setValue('1').setEmoji('📖'),
new StringSelectMenuOptionBuilder().setLabel('3-5 years').setValue('2').setEmoji('📚'),
new StringSelectMenuOptionBuilder().setLabel('>=5 years').setValue('3').setEmoji('🤓'),
);

// const programmingLanguagesKnown = new StringSelectMenuBuilder().setCustomId('TKL').setPlaceholder('Which programming languages do you know ?')
// .addOptions(
// new StringSelectMenuOptionBuilder().setLabel('JavaScript').setValue('0').setEmoji('1373958358931079268'),
// new StringSelectMenuOptionBuilder().setLabel('TypeScript').setValue('1'),
// new StringSelectMenuOptionBuilder().setLabel('Python').setValue('1').setEmoji('1373959522313572392'),
// new StringSelectMenuOptionBuilder().setLabel('Rust').setValue('2').setEmoji('📚'),
// new StringSelectMenuOptionBuilder().setLabel('Solidity').setValue('3').setEmoji('1373957880864313424'),
// new StringSelectMenuOptionBuilder().setLabel('Java').setValue('4').setEmoji('🤓'),
// new StringSelectMenuOptionBuilder().setLabel('C#').setValue('5').setEmoji('1373959489203470376'),
// new StringSelectMenuOptionBuilder().setLabel('Go').setValue('7').setEmoji('1373959418097700894'),
// new StringSelectMenuOptionBuilder().setLabel('Kotlin').setValue('8').setEmoji('1373959490562691113'),
// new StringSelectMenuOptionBuilder().setLabel('R').setValue('9').setEmoji('1373959514491064381'),
// new StringSelectMenuOptionBuilder().setLabel('PHP').setValue('10').setEmoji('1373959487341334569'),
// new StringSelectMenuOptionBuilder().setLabel('Assembler').setValue('11').setEmoji('⚙️'),
// new StringSelectMenuOptionBuilder().setLabel('Django').setValue('12').setEmoji('1373961102081392774'),
// ).setMinValues(1).setMaxValues(20);




const psrRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(select);

const jexsRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(jexsSelect);

const web3InterestRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(web3InterestSelect);


const firstQuestionMenuOptions = new StringSelectMenuBuilder().setCustomId('firstQuestion').setPlaceholder('What is the key diff between memory and storage whenused in a function parameter ?').addOptions([
    new StringSelectMenuOptionBuilder().setLabel('Storage variables are gas-free').setValue('A-1'),
    new StringSelectMenuOptionBuilder().setLabel('Memory variables persist across transactions').setValue('B-1'),
    new StringSelectMenuOptionBuilder().setLabel('Storage points to data on-chain, memory is temporary in RAM').setValue('C-1'),
    new StringSelectMenuOptionBuilder().setLabel('Memory variables are written to the blockchain').setValue('D-1'),
    new StringSelectMenuOptionBuilder().setLabel('Both are same unless inside the constructor').setValue('E-1'),
]).setMinValues(1).setMaxValues(5);

const secondQuestionMenuOptions = new StringSelectMenuBuilder().setCustomId('secondQuestion').setPlaceholder('What does the delegatecall opcode allow a smart contract to do ?').addOptions([
    new StringSelectMenuOptionBuilder().setLabel('Call a function from another contract changing its state').setValue('A-2'),
    new StringSelectMenuOptionBuilder().setLabel(`Run another contract's code in the context of the caller's storage`).setValue('B-2'),
    new StringSelectMenuOptionBuilder().setLabel('Execute internal functions recursively').setValue('C-2'),
    new StringSelectMenuOptionBuilder().setLabel('Clone contract bytecode').setValue('D-2')
]);

const thirdQuestionMenuOptions = new StringSelectMenuBuilder().setCustomId('thirdQuestion').setPlaceholder('What is a re-entrancy vulnerability primarily caused by ?').addOptions([
    new StringSelectMenuOptionBuilder().setLabel('Lack of require statements').setValue('A-3'),
    new StringSelectMenuOptionBuilder().setLabel(`Calling delegatecall without checks`).setValue('B-3'),
    new StringSelectMenuOptionBuilder().setLabel('Transferring Ether before state update').setValue('C-3'),
    new StringSelectMenuOptionBuilder().setLabel('Using outdated Solidity versions').setValue('D-3'),
    new StringSelectMenuOptionBuilder().setLabel('Using loops with msg.sender').setValue('E-3')
]);

const firstQuestionRow= new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(firstQuestionMenuOptions);

const secondQuestionRow= new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(secondQuestionMenuOptions);

const thirdQuestionRow= new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(thirdQuestionMenuOptions);

const fourthQuestionRow= new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder({'customId':'A-4', 'label':'PoS is more energy efficient', style:ButtonStyle.Success}),
    new ButtonBuilder({'customId':'B-4', 'label':'Validators are randomly selected', style:ButtonStyle.Danger}),
    new ButtonBuilder({'customId':'C-4', 'label':'Stake slashing can occur for validator downtime', style:ButtonStyle.Primary}),
    new ButtonBuilder({'customId':'D-4', 'label':'PoS systems are immune to Sybil attacks', style:ButtonStyle.Secondary}),
    new ButtonBuilder({style:ButtonStyle.Primary, label:"PoS allows faster block finality", customId:'E-4' }),
);

const fifthQuestionRow= new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder({'customId':'A-5', 'label':'zkSync', style:ButtonStyle.Success}),
    new ButtonBuilder({'customId':'B-5', 'label':'StarkNet', style:ButtonStyle.Danger}),
    new ButtonBuilder({'customId':'C-5', 'label':'Polygon PoS', style:ButtonStyle.Primary}),
    new ButtonBuilder({'customId':'D-5', 'label':'Scroll', style:ButtonStyle.Secondary}),
        new ButtonBuilder({'customId':'E-5', 'label':'Linea', style:ButtonStyle.Secondary}),
);


const claimTokenRow= new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder({'customId':'finalStep', 'label':'Provide your wallet address', style:ButtonStyle.Success})
);


const message =  await interaction.reply({
            content:'What is your programming seniority level (noncommercial + commercial)?',
            components: [psrRow],
            withResponse: true
        });

        const collector = message.resource?.message?.createMessageComponentCollector({
            componentType:ComponentType.StringSelect,
            time: 3600000
        });


        const buttonCollector = message.resource?.message?.createMessageComponentCollector({
            componentType:ComponentType.Button,
            time: 3600000
        });




        const collectorFilter = (i: any) => i.user.id === interaction.user.id;
        
        try {
        
            collector?.on('collect', async (i:any) => {
                if (i.customId === 'PSR') {
                    console.log('PSR',
                        i.values[0]);
                    customObject['PSR'] = Number(i.values[0]);
                    await i.update({content:`Great ! You have selected your programming seniority level, now how about job-experience ?`, components: [
                        jexsRow
                    ]});
                } 

                if (i.customId === 'JEXS') {
                    console.log('JEXS',
                        i.values[0]);
                    customObject['JEXS'] = Number(i.values[0]);
                    await i.update({content:`Great ! You have selected your job-experience level, Now tell us how long are you interested in Web3 (in all it's aspects) ?`, components: [
                        web3InterestRow
                    ]});
                  
                }

                if(i.customId === 'W3I'
                ){
                    console.log('W3I',
                        i.values[0]);
                    customObject['W3I'] = Number(i.values[0]);
                    await i.update({content:`What is the main difference between a delegatecall and a call ? Now let's check your knowledge in Crypto from technical side ! In Solidity, what’s the key difference between memory and storage when used in a function parameter?`, components: [
                        firstQuestionRow
                    ]});
                }
            

                if(i.customId === 'firstQuestion'
                ){
                    if(i.values[0]=== 'C-1') questionsCorrectlyAnswered++;
             
                    await i.update({content:`${i.values[0] === 'C-1' ? '✅ Correct !' : '❌ Wrong'}, What does the delegatecall opcode allow a smart contract to do ?`, components: [
                        secondQuestionRow
                    ]});
                   
                }

                if(i.customId === 'secondQuestion'
                ){
                    if(i.values[0]=== 'B-2') questionsCorrectlyAnswered++;

                    console.log('secondQuestion',
                        i.values[0]);
                    await i.update({content:`
                        ${i.values[0] === 'B-2' ? '✅ Correct !' : '❌ Wrong'}. Now, what is a re-entrancy vulnerability primarily caused by ?
                        `, components: [
                        thirdQuestionRow
                    ]});
                }

                if(i.customId === 'thirdQuestion'
                ){
                  
                     if(i.values[0]=== 'C-3') questionsCorrectlyAnswered++;

                    await i.update({content:`${i.values[0] === 'C-3' ? '✅ Correct !' : '❌ Wrong'} Which of these statements about Proof of Stake is FALSE?`, 
                        components: [
                        fourthQuestionRow
                    ]});
                }

            });

            buttonCollector?.on('collect', async (i:any) => {
                if (i.customId.includes('-4')) {
                   
                    if(i.customId === 'D-4') questionsCorrectlyAnswered++;
                    
                    await i.update({content:`${i.customId === 'D-4' ? `✅ Correctly answered question, one more to go ! Final Question ! Which of these technologies is fundamentally different from the others in how it scales Ethereum ?` : `❌ Wrong answer, one more to go ! Which of these technologies is fundamentally different from the others in how it scales Ethereum ?`}`, components: [
                        fifthQuestionRow
                    ]});
                }

                if(i.customId.includes('-5')){
                 
                      if(i.customId === 'C-5') questionsCorrectlyAnswered++;

                    await i.update({content:`${i.customId === 'C-5' ? `✅ Correctly answered question, one more to go ! You can now claim your tokens` : `❌ Wrong answer, This is already an end, you can now claim your tokens`}`, components: []});
                
                    await interaction.user.send({content:`Congratulations you have passed the initial-distribution configuration, you can now claim your tokens !`, 'components':[claimTokenRow]});
                }


                if (i.customId === 'finalStep') {
                  
            
                }
            });

     

        
    } catch (error) {
        console.error(error);
        await interaction.editReply({ content: 'There was an error while executing this command !',  components: []});
    }


},

}