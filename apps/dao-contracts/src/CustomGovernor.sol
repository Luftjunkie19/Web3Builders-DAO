// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IVotes} from "@openzeppelin/contracts/governance/utils/IVotes.sol";
import {ERC20Votes} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract CustomBuilderGovernor {

error InvalidProposalState(string message);
error InvalidUserPropose(string message);
error InvalidUserVote(string message);

event ProposalCreated(
        uint256 id,
        address proposer
    );

event ProposalCanceled(
        uint256 id,
        address proposer
    );

event ProposalExecuted(
        uint256 id,
        address proposer
    );

event ProposalVoted(
        uint256 id,
        address voter,
        uint256 weight,
        StandardProposalVote standardVoteOption,
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

struct Proposal{
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
        uint256 customVoteCount;
        uint256 proposalVoteWeight;
        uint256 customVoteWeight;
        StandardProposalVote standardVoteOption;
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
        uint256 proposalId;
        uint256 weight;
        StandardProposalVote standardVoteOption;
        CustomProposalVote customVoteOption;
        bool isVoted;
        bool isDelegated;
        string reason;
        uint256 timestamp;
        bytes32 extraData;
    }

mapping(UrgencyLevel => uint256) public urgencyQuorum;
mapping(uint256 => Proposal) public proposals;
mapping(uint256=> Vote) public proposalIdToVote; // proposalId to vote
mapping(uint256 => mapping(address => Vote)) public proposalIdToVotes;
mapping(address => mapping(uint256 => Vote)) public userVotes; // user address to proposalId to vote
mapping(address => mapping(uint256 => Vote)) public userDelegatedVotes; // user address to proposalId to vote
mapping(address=> Proposal[]) public userProposals; // user address to proposalId to vote

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
        urgencyQuorum[UrgencyLevel.Low] = 40;
        urgencyQuorum[UrgencyLevel.Medium] = 60;
        urgencyQuorum[UrgencyLevel.High] = 90;
    }

    
    function getIVotesToken() public view returns (IVotes) {
        return IVotestoken;
    }

    function getGovToken() public view returns (ERC20Votes) {
        return govToken;
    }

    function getProposal(uint256 proposalId) public view returns (Proposal memory) {
        return proposals[proposalId];
    }

    function getProposalCount() public view returns (uint256) {
        return proposalCount;
    }

    function getUrgencyQuorum(UrgencyLevel urgencyLevel) public view returns (uint256) {
        return urgencyQuorum[urgencyLevel];
    }

    function getProposalThreshold() public view returns (uint256) {
        return govToken.totalSupply() / 200;
    }

    function createProposal(
        string calldata description,
        address[] calldata targets,
        uint256[] calldata values,
        bytes[] calldata calldatas,
        UrgencyLevel urgencyLevel,
        StandardProposalVote standardVoteOption,
        CustomProposalVote customVoteOption
    ) public eligibleToPropose {
    
    }

    function castVote(
        uint256 proposalId,
        StandardProposalVote standardVoteOption,
        CustomProposalVote customVoteOption,
        string calldata reason,
        bytes32 extraData
    ) public {
    
    }

    function delegateVote(
        uint256 proposalId,
        address delegatee,
        StandardProposalVote standardVoteOption,
        CustomProposalVote customVoteOption,
        string calldata reason,
        bytes32 extraData
    ) public {
  
    }

    function queueProposal(uint256 proposalId) public  {
    
    }

    function executeProposal(uint256 proposalId) public {
    
    }
}


