// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;
import {IERC20, ERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

import {GovernmentToken} from "../src/GovToken.sol";
import {Test} from "../lib/forge-std/src/Test.sol";
import {TimelockController} from "../lib/openzeppelin-contracts/contracts/governance/TimelockController.sol";
import { IVotes } from "../lib/openzeppelin-contracts/contracts/governance/utils/IVotes.sol";
import {MyGovernor} from "../src/openzep-contract/BuildersGovernor.sol";

import {IGovernor} from "../lib/openzeppelin-contracts/contracts/governance/IGovernor.sol";

import {ERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

import { console } from "../lib/forge-std/src/console.sol";
import {IERC5805} from "../lib/openzeppelin-contracts/contracts/interfaces/IERC5805.sol";

contract TestDAO is Test {

// Practice tests implementation

// Fuzz test + Unit tests are executed as a single transaction. And the changes won't be persisted.

// To implement:
// - Unit Test - This type of test is used to test individual functions of a contract with hardcoded values. ✅
// - Invariant Test - 
// - Fuzz Test
// - Invariant Test
// - Fork Test
// - Gas Snapshot Test


address bob= makeAddr("bob");
address alice= makeAddr("alice");
address carol= makeAddr("carol");

TimelockController timelock;
GovernmentToken govToken;
MyGovernor governor;


function setUp() public {
    address[] memory members = new address[](1);
    address[] memory executors = new address[](1);

    govToken = new GovernmentToken();

    // Setup roles
    members[0] = address(governor); // this must happen AFTER governor is created
    executors[0]= address(governor);

    // But this happens first!
    timelock = new TimelockController(7200, members, executors, address(this));

    // Now the governor has a valid Timelock to reference
    governor = new MyGovernor(IVotes(address(govToken)), timelock);

    // (Optional but better): Give governor the proposer/executor roles after creation
    timelock.grantRole(timelock.PROPOSER_ROLE(), address(governor));
    timelock.grantRole(timelock.EXECUTOR_ROLE(), address(governor));
}
function testNotElligibleToPropose() public {
vm.startPrank(bob);
govToken.rewardUser(bob, 1000 * 1e18);

govToken.delegate(bob);

vm.roll(block.number + 1);

vm.stopPrank();

    vm.startPrank(alice);
    govToken.handInUserInitialTokens(GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.TechnologyKnowledgeLevel.LOW_KNOWLEDGE, GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.KnowledgeVerificationTestRate.LOW, false);

    govToken.delegate(alice);


vm.roll(block.number + 1);

uint256 increasedBalanceVotes = govToken.getPastVotes(alice, block.number - 1);


console.log("Votes after Increase", increasedBalanceVotes);

uint256 currentBalance = govToken.balanceOf(alice);

govToken.punishMember(alice, currentBalance - currentBalance * 1 / 201);


vm.roll(block.number + 2);

uint256 decreasedBalanceVotes = govToken.getPastVotes(alice, block.number - 1);

console.log("current Votes after decrease owned by alice:", decreasedBalanceVotes);

console.log("Minimum required votes", governor.proposalThreshold());

uint256[] memory values = new uint256[](1);

bytes[] memory calldatas = new bytes[](1);

address[] memory targets = new address[](1);

values[0] = 0;
calldatas[0] = "0x";
targets[0] = address(govToken);

vm.expectRevert();

governor.propose(targets, values, calldatas, "Here is the Test Proposal !");

vm.stopPrank();

}

function testElligibleToPropose() public {
    vm.startPrank(alice);
    govToken.handInUserInitialTokens(GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.TechnologyKnowledgeLevel.LOW_KNOWLEDGE, GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.KnowledgeVerificationTestRate.LOW, false);


uint256 currentBalance = govToken.balanceOf(alice);

govToken.delegate(alice);

vm.roll(block.number + 1);

uint256 currentVotes = govToken.getPastVotes(alice, block.number - 1);

console.log("currentVotes", currentVotes);

console.log("currentBalance", currentBalance);


uint256[] memory values = new uint256[](1);

bytes[] memory calldatas = new bytes[](1);

address[] memory targets = new address[](1);

values[0] = 0;
calldatas[0] = "0x";
targets[0] = address(govToken);

governor.propose(targets, values, calldatas, "This is a test proposal");

vm.stopPrank();
    }


function testProposeVoteForProposalWorksProperly() public {
vm.startPrank(carol);
govToken.handInUserInitialTokens(GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.TechnologyKnowledgeLevel.LOW_KNOWLEDGE, GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.KnowledgeVerificationTestRate.LOW, false);
govToken.delegate(carol);
vm.stopPrank();



vm.startPrank(alice);
govToken.handInUserInitialTokens(GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.TechnologyKnowledgeLevel.LOW_KNOWLEDGE, GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.KnowledgeVerificationTestRate.LOW, false);
govToken.delegate(alice);
vm.stopPrank();

vm.startPrank(bob);
govToken.handInUserInitialTokens(GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.TechnologyKnowledgeLevel.LOW_KNOWLEDGE, GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.KnowledgeVerificationTestRate.LOW, false);
govToken.delegate(bob);
vm.stopPrank();

vm.startPrank(alice);
vm.roll(block.number + 1); // move to the next block

uint256[] memory values = new uint256[](1);
bytes[] memory calldatas = new bytes[](1);
address[] memory targets = new address[](1);
values[0] = 0;
calldatas[0] = "0x";
targets[0] = address(0);

uint256 proposalId = governor.propose(targets, values, calldatas, "test");
vm.stopPrank();

// Simulate the voting delay so Bob is eligible to vote
vm.roll(block.number + governor.votingDelay() + 1);

vm.prank(alice);
governor.castVoteWithReason(proposalId, 2, "Abstain it!");

// Bob votes
vm.prank(bob);
governor.castVoteWithReason(proposalId, 1, "For it!");


console.log(governor.hasVoted(proposalId, bob));

console.log(governor.hasVoted(proposalId, alice));

(uint256 againstVotes, uint256 forVotes, uint256 abstainVotes) = governor.proposalVotes(proposalId);


console.log("forVotes", forVotes);
console.log("againstVotes", againstVotes);
console.log("abstainVotes", abstainVotes);

vm.roll(block.number + governor.votingPeriod() + 1);

assert(governor.state(proposalId) == IGovernor.ProposalState.Succeeded);


console.log("Proposal state before queuing:", uint(governor.state(proposalId)));
console.log(governor.proposalDeadline(proposalId), "Proposal deadline");
console.log(governor.proposalNeedsQueuing(proposalId), "Needs to be queued");
console.log("Voting period passed:", block.number >= governor.proposalDeadline(proposalId));

governor.queue(targets, values, calldatas, bytes32(keccak256("test")));

console.log("Proposal state after queuing:", uint(governor.state(proposalId)));
console.log(governor.proposalEta(proposalId), "Proposal eta");

bytes32 opId = timelock.hashOperationBatch(targets, values, calldatas, bytes32(0), keccak256(bytes("test")));
console.log("Scheduled ETA: ", timelock.getTimestamp(opId));
console.log("Now: ", block.timestamp);
console.log("Ready: ", timelock.isOperationReady(opId));



uint256 eta = governor.proposalEta(proposalId);

vm.warp(eta + 1);
console.log("Ready: ", timelock.isOperationReady(opId));

governor.execute(targets, values, calldatas, keccak256(bytes("test")));
console.log("Proposal state after executing:", uint(governor.state(proposalId)));
console.log("Proposer reward: ", govToken.balanceOf(alice));
}

function testProposalGetsDefeated() public {
    vm.startPrank(carol);
govToken.handInUserInitialTokens(GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.TechnologyKnowledgeLevel.LOW_KNOWLEDGE, GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.KnowledgeVerificationTestRate.LOW, false);
govToken.delegate(carol);
vm.stopPrank();



vm.startPrank(alice);
govToken.handInUserInitialTokens(GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.TechnologyKnowledgeLevel.LOW_KNOWLEDGE, GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.KnowledgeVerificationTestRate.LOW, false);
govToken.delegate(alice);
vm.stopPrank();

vm.startPrank(bob);
govToken.handInUserInitialTokens(GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.TechnologyKnowledgeLevel.LOW_KNOWLEDGE, GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.KnowledgeVerificationTestRate.LOW, false);
govToken.delegate(bob);
vm.stopPrank();

vm.startPrank(alice);
vm.roll(block.number + 1); // move to the next block

uint256[] memory values = new uint256[](1);
bytes[] memory calldatas = new bytes[](1);
address[] memory targets = new address[](1);
values[0] = 0;
calldatas[0] = "0x";
targets[0] = address(govToken);

uint256 proposalId = governor.propose(targets, values, calldatas, "test");
vm.stopPrank(); 

vm.roll(block.number + governor.votingDelay() + 1);

(uint256 againstVotes, uint256 forVotes, uint256 abstainVotes) = governor.proposalVotes(proposalId);


console.log("forVotes", forVotes);
console.log("againstVotes", againstVotes);
console.log("abstainVotes", abstainVotes);

vm.roll(block.number + governor.votingPeriod() + 1);

assert(governor.state(proposalId) == IGovernor.ProposalState.Defeated);

}


function testPunishMember(address user, uint256 amount) public {
    vm.assume(user != address(0));
    amount = bound(amount, 1e18, govToken.MAX_SUPPLY());

    vm.prank(user);
    govToken.rewardUser(user, amount);
    govToken.increaseUserMaliciousActions(user);
    govToken.increaseUserMaliciousActions(user);
    govToken.increaseUserMaliciousActions(user);
    govToken.punishMember(user, amount);
    
}

function testRevertTotalSupply(uint256 amount) public {
   vm.assume(amount > 19 *10**24);
   vm.expectRevert();

   vm.prank(alice);
   govToken.rewardUser(alice, amount);

}

function testGetMaxSupply() public view returns(uint256){
    return govToken.MAX_SUPPLY();
}

function testIncreaseMaliciousActionsRate
() public {
govToken.increaseUserMaliciousActions(alice);    
}

function testGetProposalThresholdIsEqualProperAmount() public {
    
    vm.prank(alice);
    govToken.handInUserInitialTokens(GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.TechnologyKnowledgeLevel.LOW_KNOWLEDGE, GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.KnowledgeVerificationTestRate.LOW, false);
    uint256 balance = govToken.balanceOf(alice);

assertEq(balance / 200, governor.proposalThreshold());
}

function testGetNonces() public view returns(uint256){
    return govToken.nonces(alice);
}

function testGovernorHasToken() public view returns(IERC5805){
    return governor.token();
}

function testGetGovTokenOwner() public view returns(address){
    return govToken.owner();
}

function testTokenIsCorrectlyBurnt() public  {
    vm.prank(alice);
    govToken.handInUserInitialTokens(GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.TechnologyKnowledgeLevel.LOW_KNOWLEDGE, GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.KnowledgeVerificationTestRate.LOW, false);
    assert(govToken.balanceOf(alice) == 1000 * 10**18);
    assert(govToken.readMemberInfluence(alice) == 1000 * 10**18);

    uint256 balance = govToken.balanceOf(alice);
    govToken.punishMember(alice, balance);
    assert(govToken.balanceOf(alice) == 0);
    assert(govToken.readMemberInfluence(alice) == 0);

    vm.roll(block.number + 1);
    uint256 bobBalance = govToken.balanceOf(alice);
    uint256 bobVotingPowerPast = govToken.getPastVotes(alice, block.number - 1);

    assert(bobBalance == 0);
    assert(bobVotingPowerPast == 0);
    
}

function testNewlyMintedTokensIncreaseTotalSupply() public{
 vm.prank(alice);
govToken.handInUserInitialTokens(GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.TechnologyKnowledgeLevel.LOW_KNOWLEDGE, GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.KnowledgeVerificationTestRate.LOW, false);

vm.startPrank(bob);
govToken.handInUserInitialTokens(GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.TechnologyKnowledgeLevel.LOW_KNOWLEDGE, GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.KnowledgeVerificationTestRate.LOW, false);
govToken.punishMember(bob, govToken.balanceOf(bob) / 10);
vm.stopPrank();

uint256 bobBalance = govToken.balanceOf(bob);
uint256 aliceBalance = govToken.balanceOf(alice);

assert(govToken.totalSupply() == bobBalance + aliceBalance);
}

function testIntialTokenReceiveWorksCorrectly() public{
    vm.prank(alice);
    govToken.handInUserInitialTokens(GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.TechnologyKnowledgeLevel.LOW_KNOWLEDGE, GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.KnowledgeVerificationTestRate.LOW, false);

uint balanceBeforePunishment = govToken.balanceOf(alice);
uint votingPowerBeforePunishment = govToken.readMemberInfluence(alice);
    
    assert(balanceBeforePunishment == votingPowerBeforePunishment);


 vm.prank(alice);
govToken.handInUserInitialTokens(GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.TechnologyKnowledgeLevel.LOW_KNOWLEDGE, GovernmentToken.TokenReceiveLevel.LOW, GovernmentToken.KnowledgeVerificationTestRate.LOW, false);

uint balance = govToken.balanceOf(alice);
uint votingPowerAfterPunishment = govToken.readMemberInfluence(alice);

    assert(balance < balanceBeforePunishment);
    assert(votingPowerBeforePunishment > votingPowerAfterPunishment);


    
}




}
