// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IVotes} from "@openzeppelin/contracts/governance/utils/IVotes.sol";
import {ERC20Votes} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract CustomBuilderGovernor {

// Errors
error InvalidProposalState(string message);
error InvalidUserPropose(string message);
error InvalidUserVote(string message);

// Events
event ProposalCreated(
        bytes32 id,
        address proposer
    );

event ProposalCanceled(
        uint256 id,
        address proposer
    );

event ProposalExecuted(
        bytes32 id,
        address proposer
    );

event ProposalQueued(
        bytes32 id,
        address proposer
    );

event ProposalStandardVoted(
        bytes32 id,
        address voter,
        uint256 weight,
        StandardProposalVote standardVoteOption
    );

event ProposalCustomVoted(
        bytes32 id,
        address voter,
        uint256 weight,
        CustomProposalVote customVoteOption
    );

event ProposalVoteDelegated(
        uint256 id,
        address voter,
        address delegatee,
        uint256 weight,
        StandardProposalVote standardVoteOption,
        CustomProposalVote customVoteOption
    );

    event ProposalDefeated(
        bytes32 id,
        address proposer
    );


// Enums
    enum VotingOptionsType{
        Standard,
        Custom
    }

    enum StandardProposalVote {
        Yes,
        No,
        Abstain
    }

    enum CustomProposalVote {
        Custom1,
        Custom2,
        Custom3,
        Custom4,
        Custom5
    }

enum ProposalState{
        Pending,
        Active,
        Canceled,
        Defeated,
        Succeeded,
        Queued,
        Executed
}

enum UrgencyLevel{
        Low,
        Medium,
        High
}

// Structs
struct StandardProposal{
    bytes32 id;
    address proposer;
    string description;
    uint256 startBlock;
    uint256 endBlock;
    VotingOptionsType votingOptionsType;
    uint256 votingPeriod;
    uint256 votingDelay;
    UrgencyLevel urgencyLevel;
    uint256 proposalVoteCount;
    uint256 proposalVoteWeight;
    StandardProposalVote standardVoteOption;
    ProposalState state;
    address[] targets; // reward addresses or system logic
    uint256[] values;
    bytes[] calldatas;
    bool executed;
    bool canceled;
    uint256 queuedAt;
    uint256 executedAt;
    uint256 canceledAt;
    }

    struct CustomProposal{
        bytes32 id;
        address proposer;
        string description;
        uint256 startBlock;
        uint256 endBlock;
        VotingOptionsType votingOptionsType;
        uint256 votingPeriod;
        uint256 votingDelay;
        UrgencyLevel urgencyLevel;
        uint256 proposalVoteCount;
        uint256 proposalVoteWeight;
        CustomProposalVote customVoteOption;
        ProposalState state;
        address[] targets; // reward addresses or system logic
        uint256[] values;
        bytes[] calldatas;
        bool executed;
        bool canceled;
        uint256 queuedAt;
        uint256 executedAt;
        uint256 canceledAt; 
    }
    
    struct Vote{
        address voter;
        bytes32 proposalId;
        uint256 weight;
        StandardProposalVote standardVoteOption;
        bool isCustom;
        CustomProposalVote customVoteOption;
        bool isVoted;
        bool isDelegated;
        string reason;
        uint256 timestamp;
        bytes32 extraData;
    }

// mappings
mapping(UrgencyLevel => uint256) public urgencyLevelToQuorum;
mapping(bytes32 => StandardProposal) public standardProposals; // proposalId to proposal
mapping(bytes32 => CustomProposal) public customProposals; // proposalId to proposal
mapping(bytes32=> Vote) public proposalIdToVote; // proposalId to vote
mapping(bytes32 => mapping(address => Vote)) public proposalIdToVotes;
mapping(address => mapping(bytes32 => Vote)) public userVotes; // user address to proposalId to vote
mapping(address => mapping(bytes32 => Vote)) public userDelegatedVotes; // user address to proposalId to vote
mapping(address=> StandardProposal[]) public userStandardProposals; // user address to proposalId to vote
mapping(address=> CustomProposal[]) public userCustomProposals; // user address to proposalId to vote

// Variables
uint256 public constant MIN_VOTING_PERIOD = 100; // 100 blocks
uint256 public constant MAX_VOTING_PERIOD = 1000; // 1000 blocks

uint256 public constant MIN_VOTING_DELAY = 1; // 1 block
uint256 public constant MAX_VOTING_DELAY = 10; // 10 blocks

uint256 public constant LOW_LEVEL_URGENCY_QUORUM = 40;
uint256 public constant MEDIUM_LEVEL_URGENCY_QUORUM = 60;
uint256 public constant HIGH_LEVEL_URGENCY_QUORUM = 90;

uint256 public proposalCount;
IVotes public immutable IVotestoken;
ERC20Votes public immutable govToken;


modifier eligibleToPropose() {
        if(govToken.getVotes(msg.sender) >= getProposalThreshold()){
            revert InvalidUserPropose("You are not eligible to propose a new proposal.");
        }
        _;
    }

constructor(IVotes _token){
        IVotestoken = _token;
        govToken = ERC20Votes(address(_token));
        // Set default quorum for each urgency level
        urgencyLevelToQuorum[UrgencyLevel.Low] = LOW_LEVEL_URGENCY_QUORUM;
        urgencyLevelToQuorum[UrgencyLevel.Medium] = MEDIUM_LEVEL_URGENCY_QUORUM;
        urgencyLevelToQuorum[UrgencyLevel.High] = HIGH_LEVEL_URGENCY_QUORUM;
    }

    
    function getIVotesToken() public view returns (IVotes) {
        return IVotestoken;
    }

    function getGovToken() public view returns (ERC20Votes) {
        return govToken;
    }

    function getStandardProposal(bytes32 proposalId) public view returns (StandardProposal memory) {
        return standardProposals[proposalId];
    }

    function getCustomProposal(bytes32 proposalId) public view returns (CustomProposal memory) {
        return customProposals[proposalId];
    }

    function getProposalCount() public view returns (uint256) {
        return proposalCount;
    }

    function getUrgencyQuorum(UrgencyLevel urgencyLevel) public view returns (uint256) {
        return urgencyLevelToQuorum[urgencyLevel];
    }

    function getProposalThreshold() public view returns (uint256) {
        return govToken.totalSupply() / 200;
    }

    function createStandardProposal(
        string calldata description,
        address[] calldata targets,
        uint256[] calldata values,
        bytes[] calldata calldatas,
        UrgencyLevel urgencyLevel,
        StandardProposalVote standardVoteOption
    ) public eligibleToPropose {
        proposalCount++;

        bytes32 proposalId = keccak256(abi.encodePacked(proposalCount,description, targets, values, msg.sender, block.timestamp));

        StandardProposal memory proposal = StandardProposal(
            proposalId,
            msg.sender,
            description,
            block.number + 1, // start block
            block.number + 100, // end block
            VotingOptionsType.Standard,
            100, // voting period
            1, // voting delay
            urgencyLevel,
            0, // proposal vote count
            0, // proposal vote weight
            standardVoteOption,
            ProposalState.Pending,
            targets,
            values,
            calldatas,
            false, // executed
            false, // canceled
            0, // queuedAt
            0, // executedAt
            0 // canceledAt
        ); 

        standardProposals[proposalId] = proposal;
        userStandardProposals[msg.sender].push(proposal);
        
        emit ProposalCreated(proposalId, msg.sender);
    }

    function createCustomProposal(
        string calldata description,
        address[] calldata targets,
        uint256[] calldata values,
        bytes[] calldata calldatas,
        UrgencyLevel urgencyLevel,
        CustomProposalVote customVoteOption
    ) public eligibleToPropose {
        proposalCount++;

        bytes32 proposalId = keccak256(abi.encodePacked(proposalCount,description, targets, values, msg.sender, block.timestamp));

        CustomProposal memory proposal = CustomProposal(
            proposalId,
            msg.sender,
            description,
            block.number + 1, // start block
            block.number + 100, // end block
            VotingOptionsType.Custom,
            100, // voting period
            1, // voting delay
            urgencyLevel,
            0, // proposal vote count
            0, // proposal vote weight
            customVoteOption,
            ProposalState.Pending,
            targets,
            values,
            calldatas,
            false, // executed
            false, // canceled
            0, // queuedAt
            0, // executedAt
            0 // canceledAt
        ); 

        customProposals[proposalId] = proposal;
        userCustomProposals[msg.sender].push(proposal);
        
        emit ProposalCreated(proposalId, msg.sender);
    }

    function castStandardVote(
        bytes32 proposalId,
        StandardProposalVote standardVoteOption,
        string calldata reason,
        bytes32 extraData
    ) public {
        govToken.delegate(msg.sender);
        uint256 weight = govToken.getVotes(msg.sender);

proposalIdToVote[proposalId].weight = weight;
        proposalIdToVote[proposalId].standardVoteOption = standardVoteOption;
        proposalIdToVote[proposalId].reason = reason;
        proposalIdToVote[proposalId].extraData = extraData;
        proposalIdToVote[proposalId].isVoted = true;
        proposalIdToVote[proposalId].timestamp = block.timestamp;

        proposalIdToVotes[proposalId][msg.sender] = proposalIdToVote[proposalId];

        proposalIdToVotes[proposalId][msg.sender].voter = msg.sender;
        proposalIdToVotes[proposalId][msg.sender].proposalId = proposalId;
        proposalIdToVotes[proposalId][msg.sender].weight = weight;
        
        userVotes[msg.sender][proposalId] = proposalIdToVote[proposalId];
        userVotes[msg.sender][proposalId].voter = msg.sender;
        userVotes[msg.sender][proposalId].proposalId = proposalId;
        userVotes[msg.sender][proposalId].weight = weight;
        userVotes[msg.sender][proposalId].isDelegated = false;
        userVotes[msg.sender][proposalId].isVoted = true;
        userVotes[msg.sender][proposalId].timestamp = block.timestamp;
        userVotes[msg.sender][proposalId].reason = reason;
        userVotes[msg.sender][proposalId].extraData = extraData;
        userVotes[msg.sender][proposalId].standardVoteOption = standardVoteOption;
        userVotes[msg.sender][proposalId].isCustom = false;

        
        emit ProposalStandardVoted(proposalId, msg.sender, weight, standardVoteOption);
    
    }

    function castCustomVote(
        bytes32 proposalId,
        CustomProposalVote customVoteOption,
        string calldata reason,
        bytes32 extraData
    ) public {
        govToken.delegate(msg.sender);
        uint256 weight = govToken.getVotes(msg.sender);
        proposalIdToVote[proposalId].weight = weight;
        proposalIdToVote[proposalId].customVoteOption = customVoteOption;
        proposalIdToVote[proposalId].reason = reason;
        proposalIdToVote[proposalId].extraData = extraData;
        proposalIdToVote[proposalId].isVoted = true;
        proposalIdToVote[proposalId].timestamp = block.timestamp;
        proposalIdToVotes[proposalId][msg.sender].isCustom = true;
        proposalIdToVotes[proposalId][msg.sender] = proposalIdToVote[proposalId];
        proposalIdToVotes[proposalId][msg.sender].voter = msg.sender;
        proposalIdToVotes[proposalId][msg.sender].proposalId = proposalId;
        proposalIdToVotes[proposalId][msg.sender].weight = weight;

     userVotes[msg.sender][proposalId] = proposalIdToVote[proposalId];
        userVotes[msg.sender][proposalId].voter = msg.sender;   
        userVotes[msg.sender][proposalId].proposalId = proposalId;
        userVotes[msg.sender][proposalId].weight = weight;
        userVotes[msg.sender][proposalId].isDelegated = false;
        userVotes[msg.sender][proposalId].isVoted = true;
        userVotes[msg.sender][proposalId].timestamp = block.timestamp;
        userVotes[msg.sender][proposalId].reason = reason;
        userVotes[msg.sender][proposalId].extraData = extraData;
        userVotes[msg.sender][proposalId].customVoteOption = customVoteOption;
        userVotes[msg.sender][proposalId].isCustom = true;

        
        
        
        emit ProposalCustomVoted(proposalId, msg.sender, weight, customVoteOption);
   
    }
    function queueStandardProposal(bytes32 proposalId) public  {
        StandardProposal storage proposal = standardProposals[proposalId];

if(urgencyLevelToQuorum[proposal.urgencyLevel] > proposal.proposalVoteWeight){
    proposal.state = ProposalState.Defeated;
    proposal.canceled = true;
    proposal.canceledAt = block.timestamp;
    emit ProposalDefeated(proposalId, msg.sender);
    return;
    }

        if (proposal.state != ProposalState.Succeeded) {
            revert InvalidProposalState("Proposal is not in a state to be queued.");
        }
        proposal.state = ProposalState.Queued;
        proposal.queuedAt = block.timestamp;
        emit ProposalQueued(proposalId, msg.sender);

    
    }

    function queueCustomProposal(bytes32 proposalId) public  {
        CustomProposal storage proposal = customProposals[proposalId];

if(urgencyLevelToQuorum[proposal.urgencyLevel] > proposal.proposalVoteWeight){
    proposal.state = ProposalState.Defeated;
    proposal.canceled = true;
    proposal.canceledAt = block.timestamp;
    emit ProposalDefeated(proposalId, msg.sender);
    return;
    }


        if (proposal.state != ProposalState.Succeeded) {
            revert InvalidProposalState("Proposal is not in a state to be queued.");
        }
        proposal.state = ProposalState.Queued;
        proposal.queuedAt = block.timestamp;
        emit ProposalQueued(proposalId, msg.sender);

    
    }

    function executeStandardProposal(bytes32 proposalId) public {
        StandardProposal storage proposal = standardProposals[proposalId];
        if (proposal.state != ProposalState.Queued) {
            revert InvalidProposalState("Proposal is not in a state to be executed.");
        }
        proposal.state = ProposalState.Executed;
        proposal.executedAt = block.timestamp;
        proposal.executed = true;

        emit ProposalExecuted(proposalId, msg.sender);
    
    }

    function executeCustomProposal(bytes32 proposalId) public {
        CustomProposal storage proposal = customProposals[proposalId];
        if (proposal.state != ProposalState.Queued) {
            revert InvalidProposalState("Proposal is not in a state to be executed.");
        }
        proposal.state = ProposalState.Executed;
        proposal.executedAt = block.timestamp;
        proposal.executed = true;

        emit ProposalExecuted(proposalId, msg.sender);
    
    }

}


