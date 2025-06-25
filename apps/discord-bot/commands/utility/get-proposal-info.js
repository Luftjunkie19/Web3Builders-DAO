"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
module.exports = {
    cooldown: 15,
    data: new discord_js_1.SlashCommandBuilder().setName('get-proposal-info')
        .setDescription('Enables user to see the info of a proposal, to vote on it').addStringOption(option => option.setName('proposal-id').setDescription('Pass the proposal id, you want to vote for.').setRequired(true)),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!interaction.guild) {
                    return;
                }
                ;
                const proposalStates = ["Pending 🚄", "Active ✅", "Canceled ❌", "Defeated 🥊", "Succeeded 🏆", "Queued 🛤️", "Executed 💣"];
                const proposalId = interaction.options.getString('proposal-id');
                if (!proposalId) {
                    return yield interaction.reply({ content: `Invalid proposal id. (${proposalId})`, flags: discord_js_1.MessageFlags.Ephemeral });
                }
                yield interaction.deferReply();
                const proposalEmbedDetailsFetch = yield fetch(`${process.env.BACKEND_ENDPOINT}/governance/get_embeded_proposal_details/${proposalId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-backend-eligibility': process.env.DISCORD_BOT_INTERNAL_SECRET,
                    },
                });
                const proposalEmbedDetails = yield proposalEmbedDetailsFetch.json();
                console.log(proposalEmbedDetails);
                if (!proposalEmbedDetails.data) {
                    return yield interaction.editReply({ content: proposalEmbedDetails.error.message });
                }
                const proposalOptions = proposalEmbedDetails.data.db_data && proposalEmbedDetails.data.db_data.dao_vote_options && proposalEmbedDetails.data.db_data.dao_vote_options.length > 0 ? proposalEmbedDetails.data.db_data.dao_vote_options.map((option) => ({ name: option.voting_option_text, value: option.isExecuting ? 'Executes the callbacks' : 'Does not execute the callbacks', inline: true })) : [{ name: 'For', value: 'You vote for approval of the proposal', inline: true }, { name: 'Against', value: 'You vote against approval of the proposal', inline: true }, { name: 'Abstain', value: 'You vote against approval of the proposal', inline: true }];
                const callbackData = proposalEmbedDetails.data.db_data && proposalEmbedDetails.data.db_data.calldata_objects && proposalEmbedDetails.data.db_data.calldata_objects.length > 0 ? proposalEmbedDetails.data.db_data.calldata_objects.map((callback) => ({ name: callback.functionDisplayName, value: `${callback.amountParameter} Tokens`, inline: false })) : [{ name: 'No Functions !', 'value': 'This proposal is only a general proposal, whose execution doesnt execute any functions !' }];
                const exampleEmbed = new discord_js_2.EmbedBuilder()
                    .setColor(0x05F29B)
                    .setTitle(`${proposalEmbedDetails.data.db_data.proposal_title}`)
                    .setDescription(`${proposalEmbedDetails.data.sm_data.description}`).setAuthor({ 'name': `Web3 Builders DAO`, 'iconURL': interaction.guild.iconURL() });
                exampleEmbed.addFields([{ 'name': 'Proposal State', value: proposalStates[Number(proposalEmbedDetails.data.sm_data.state)] }]);
                exampleEmbed.addFields([{ 'inline': false, 'name': 'Execution Details', 'value': 'Here you will find the details of what will be executed if you vote for approving it.' }, ...callbackData]);
                exampleEmbed.addFields([{ 'inline': false, 'name': 'Voting Options', 'value': 'Here you see the options you can vote for and what they will do \n\n' }, ...proposalOptions]);
                exampleEmbed.setFooter({ 'iconURL': `${proposalEmbedDetails.data.db_data.dao_members.photoURL}`, text: `Proposer : ${proposalEmbedDetails.data.db_data.dao_members.nickname} | Proposal ID: ${proposalEmbedDetails.data.db_data.proposal_id}` });
                exampleEmbed.addFields([{ name: 'Start Date', value: `${(0, date_fns_1.formatDate)(proposalEmbedDetails.data.sm_data.startBlockTimestamp * 1000, 'dd-MM-yyyy, HH:mm')}`, inline: true }]);
                exampleEmbed.addFields([{ name: 'Deadline Date', value: `${(0, date_fns_1.formatDate)(proposalEmbedDetails.data.sm_data.endBlockTimestamp * 1000, 'dd-MM-yyyy, HH:mm')}`, inline: true }]);
                yield interaction.editReply({ content: `Here you are 😁`, embeds: [exampleEmbed] });
            }
            catch (err) {
                console.log(err);
                yield interaction.editReply({ content: 'There was an error while executing this command!' });
            }
        });
    }
};
