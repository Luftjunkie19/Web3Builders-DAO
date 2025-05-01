//SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import {Test} from "../../lib/forge-std/src/Test.sol";
import {IVotes} from "../../lib/openzeppelin-contracts/contracts/governance/utils/IVotes.sol";
import {CustomBuilderGovernor} from "../../src/CustomGovernor.sol";
import {GovernmentToken} from "../../src/GovToken.sol";
import {console} from "../../lib/forge-std/src/console.sol";

import {DeployContract} from "../../script/GovernanceContracts.s.sol";

contract TestCustomDAO is Test {
    DeployContract deployer;

    CustomBuilderGovernor public customGovernor;
    GovernmentToken public govToken;

    address public user1 = makeAddr("user1");
    address public user2 = makeAddr("user2");
    address public user3 = makeAddr("user3");

 function setUp() public {
        deployer = new DeployContract();

(customGovernor, govToken) = deployer.run();

        govToken = new GovernmentToken();
        customGovernor = new CustomBuilderGovernor(IVotes(address(govToken)));
    }

    function testExceededSupplyOccurs(uint256 supply) public {
        
        vm.assume(supply > 19e24);

        vm.prank(user1);
        govToken.handInUserInitialTokens(
            GovernmentToken.TokenReceiveLevel.MEDIUM,
            GovernmentToken.TokenReceiveLevel.MEDIUM_LOW,
            GovernmentToken.TechnologyKnowledgeLevel.NOT_SELECTED,
            GovernmentToken.TokenReceiveLevel.MEDIUM,
            GovernmentToken.KnowledgeVerificationTestRate.HIGH,
            false
        );

        vm.expectRevert();
vm.prank(user1);
govToken.rewardUser(user1, supply);

    }


    function testPunishMemberWorksProperly() public {
        vm.startPrank(user2);
              govToken.handInUserInitialTokens(
            GovernmentToken.TokenReceiveLevel.MEDIUM,
            GovernmentToken.TokenReceiveLevel.MEDIUM_LOW,
            GovernmentToken.TechnologyKnowledgeLevel.NOT_SELECTED,
            GovernmentToken.TokenReceiveLevel.MEDIUM,
            GovernmentToken.KnowledgeVerificationTestRate.HIGH,
            false
        );

        govToken.punishMember(user1, 15e22);

govToken.rewardUser(user1, 15e21);
console.log(govToken.readMemberInfluence(user1));

govToken.punishMember(user1, 15e18);
console.log(govToken.readMemberInfluence(user1));

govToken.punishMember(user1, 15e18);
console.log(govToken.readMemberInfluence(user1));

govToken.punishMember(user1, 15e18);
console.log(govToken.readMemberInfluence(user1));


govToken.punishMember(user1, 15e18);
console.log(govToken.readMemberInfluence(user1));




assert(govToken.userMaliciousActions(address(user1)) == 3);
console.log(govToken.readMemberInfluence(user1));

        vm.stopPrank();
    }

function testClaimIntialTokensWorksProperly() public {
    vm.prank(user1);
    govToken.handInUserInitialTokens(GovernmentToken.TokenReceiveLevel.MEDIUM, GovernmentToken.TokenReceiveLevel.MEDIUM_LOW, GovernmentToken.TechnologyKnowledgeLevel.NOT_SELECTED, GovernmentToken.TokenReceiveLevel.MEDIUM, GovernmentToken.KnowledgeVerificationTestRate.HIGH, false);  


    uint256 balance = govToken.balanceOf(user1);



vm.prank(user1);
govToken.handInUserInitialTokens(GovernmentToken.TokenReceiveLevel.MEDIUM, GovernmentToken.TokenReceiveLevel.MEDIUM_LOW, GovernmentToken.TechnologyKnowledgeLevel.NOT_SELECTED, GovernmentToken.TokenReceiveLevel.MEDIUM, GovernmentToken.KnowledgeVerificationTestRate.HIGH, false);  

uint256 balanceAfterInitialTokens = govToken.balanceOf(user1);

assertEq(govToken.userMaliciousActions(address(user1)), 1);
assert(balanceAfterInitialTokens < balance);
}

function testStandardProposalWorkflowWorksOk() public {
    vm.startPrank(user2);
    govToken.handInUserInitialTokens(GovernmentToken.TokenReceiveLevel.MEDIUM, GovernmentToken.TokenReceiveLevel.MEDIUM_LOW, GovernmentToken.TechnologyKnowledgeLevel.NOT_SELECTED, GovernmentToken.TokenReceiveLevel.MEDIUM, GovernmentToken.KnowledgeVerificationTestRate.HIGH, true); 
  
   govToken.delegate(user2);
   
   vm.stopPrank();
    // ⏳ advance a block AFTER delegation to make snapshot available
    vm.roll(block.number + 1); 

    uint256 snapshotBlock = block.number - 1; // or block.number if you want to use current
    uint256 balanceOfProposer = govToken.getPastVotes(user2, snapshotBlock);

console.log(balanceOfProposer);

uint256 proposalsAmountBeforeProposal = customGovernor.proposalCount();

address[] memory proposalCreatedTargets;
uint256[] memory proposalCreatedValues;
bytes[] memory proposalCreatedCalldata;

vm.startPrank(user2);
bytes32 proposalId =    customGovernor.createProposal("Coz I've said so though", proposalCreatedTargets, proposalCreatedValues, proposalCreatedCalldata, CustomBuilderGovernor.UrgencyLevel.Medium, false, 2400, block.timestamp + 604800); 

govToken.delegate(user2);
vm.stopPrank();

CustomBuilderGovernor.Proposal memory wannaCastVoteFailProposal = customGovernor.getProposal(proposalId);

vm.expectRevert(CustomBuilderGovernor.VotingNotStarted.selector);

vm.prank(user2);
customGovernor.castVote(proposalId, 'Coz Im gonna kick your ass', user2, 1, "0xx", wannaCastVoteFailProposal.isCustom);


uint256 proposalsAmountAfterProposal = customGovernor.proposalCount();

assert(proposalsAmountAfterProposal > proposalsAmountBeforeProposal);

CustomBuilderGovernor.Proposal memory proposal = customGovernor.getProposal(proposalId);

console.log(uint8(proposal.state),  'Proposal State');

assert(proposal.state == CustomBuilderGovernor.ProposalState.Pending);

vm.expectRevert(CustomBuilderGovernor.NotReadyToStart.selector);

customGovernor.activateProposal(proposalId);

CustomBuilderGovernor.Proposal memory proposalAfterFailed = customGovernor.getProposal(proposalId);

vm.warp(block.timestamp + proposalAfterFailed.votingDelay + 2);

customGovernor.activateProposal(proposalId);


CustomBuilderGovernor.Proposal memory proposalAfterSuccess = customGovernor.getProposal(proposalId);

assert(proposalAfterSuccess.state == CustomBuilderGovernor.ProposalState.Active);

vm.prank(user2);
customGovernor.castVote(proposalId, 'Coz Im gonna kick your ass', user2, 1, "0xx", wannaCastVoteFailProposal.isCustom);


(uint256 yesVotes, uint256 noVotes, uint256 abstainVotes) = customGovernor.getStandardProposalVotes(proposalId);

console.log(yesVotes, noVotes, abstainVotes);

vm.warp(proposalAfterSuccess.endBlockTimestamp + 1);

customGovernor.queueProposal(proposalId);

CustomBuilderGovernor.Proposal memory proposalAfterQueued = customGovernor.getProposal(proposalId);

assert(proposalAfterQueued.state == CustomBuilderGovernor.ProposalState.Queued);

customGovernor.executeProposal(proposalId);

CustomBuilderGovernor.Proposal memory proposalAfterExecuted = customGovernor.getProposal(proposalId);

assert(proposalAfterExecuted.state == CustomBuilderGovernor.ProposalState.Executed);


}



function testCustomProposalWorkflowWorksOk() public {
    vm.startPrank(user2);
    govToken.handInUserInitialTokens(GovernmentToken.TokenReceiveLevel.MEDIUM, GovernmentToken.TokenReceiveLevel.MEDIUM_LOW, GovernmentToken.TechnologyKnowledgeLevel.NOT_SELECTED, GovernmentToken.TokenReceiveLevel.MEDIUM, GovernmentToken.KnowledgeVerificationTestRate.HIGH, true); 
  
   govToken.delegate(user2);
   
   vm.stopPrank();
    // ⏳ advance a block AFTER delegation to make snapshot available
    vm.roll(block.number + 1); 

    uint256 snapshotBlock = block.number - 1; // or block.number if you want to use current
    uint256 balanceOfProposer = govToken.getPastVotes(user2, snapshotBlock);

console.log(balanceOfProposer);

uint256 proposalsAmountBeforeProposal = customGovernor.proposalCount();

address[] memory proposalCreatedTargets;
uint256[] memory proposalCreatedValues;
bytes[] memory proposalCreatedCalldata;

vm.startPrank(user2);
bytes32 proposalId =    customGovernor.createProposal("Coz I've said so though", proposalCreatedTargets, proposalCreatedValues, proposalCreatedCalldata, CustomBuilderGovernor.UrgencyLevel.Medium, true, 2400, block.timestamp + 604800); 

govToken.delegate(user2);
vm.stopPrank();

CustomBuilderGovernor.Proposal memory wannaCastVoteFailProposal = customGovernor.getProposal(proposalId);

vm.expectRevert(CustomBuilderGovernor.VotingNotStarted.selector);

vm.prank(user2);
customGovernor.castVote(proposalId, 'Coz Im gonna kick your ass', user2, 1, "0xx", wannaCastVoteFailProposal.isCustom);


uint256 proposalsAmountAfterProposal = customGovernor.proposalCount();

assert(proposalsAmountAfterProposal > proposalsAmountBeforeProposal);

CustomBuilderGovernor.Proposal memory proposal = customGovernor.getProposal(proposalId);

console.log(uint8(proposal.state),  'Proposal State');

assert(proposal.state == CustomBuilderGovernor.ProposalState.Pending);

vm.expectRevert(CustomBuilderGovernor.NotReadyToStart.selector);

customGovernor.activateProposal(proposalId);

CustomBuilderGovernor.Proposal memory proposalAfterFailed = customGovernor.getProposal(proposalId);

vm.warp(block.timestamp + proposalAfterFailed.votingDelay + 2);

customGovernor.activateProposal(proposalId);


CustomBuilderGovernor.Proposal memory proposalAfterSuccess = customGovernor.getProposal(proposalId);

assert(proposalAfterSuccess.state == CustomBuilderGovernor.ProposalState.Active);

vm.prank(user2);
customGovernor.castVote(proposalId, 'Coz Im gonna kick your ass', user2, 4, "0xx", wannaCastVoteFailProposal.isCustom);


 uint256[5] memory customVoteCounts = customGovernor.getCustomProposalVotes(proposalId);

console.log(customVoteCounts.length);

vm.warp(proposalAfterSuccess.endBlockTimestamp + 1);

customGovernor.queueProposal(proposalId);

CustomBuilderGovernor.Proposal memory proposalAfterQueued = customGovernor.getProposal(proposalId);

assert(proposalAfterQueued.state == CustomBuilderGovernor.ProposalState.Queued);

customGovernor.executeProposal(proposalId);

CustomBuilderGovernor.Proposal memory proposalAfterExecuted = customGovernor.getProposal(proposalId);

assert(proposalAfterExecuted.state == CustomBuilderGovernor.ProposalState.Executed);


}







function testRewardingWorksProperly() public {
    vm.prank(user2);
    govToken.handInUserInitialTokens(GovernmentToken.TokenReceiveLevel.MEDIUM, GovernmentToken.TokenReceiveLevel.MEDIUM_LOW, GovernmentToken.TechnologyKnowledgeLevel.NOT_SELECTED, GovernmentToken.TokenReceiveLevel.MEDIUM, GovernmentToken.KnowledgeVerificationTestRate.HIGH, true); 
  
   govToken.delegate(user2);
   
   vm.stopPrank();

    // ⏳ advance a block AFTER delegation to make snapshot available
    vm.roll(block.number + 1);
vm.prank(user2);
govToken.rewardUser(user2, 15e18);

uint256 balanceOfProposer = govToken.balanceOf(user2);
assert(balanceOfProposer > 15e18);

vm.prank(user1);
vm.expectRevert(GovernmentToken.IntialTokensNotReceived.selector);
govToken.rewardUser(user1, 15e18);

}

function testCreateProposalInelligible() public {
    vm.startPrank(user2);
    govToken.handInUserInitialTokens(GovernmentToken.TokenReceiveLevel.MEDIUM, GovernmentToken.TokenReceiveLevel.MEDIUM_LOW, GovernmentToken.TechnologyKnowledgeLevel.NOT_SELECTED, GovernmentToken.TokenReceiveLevel.MEDIUM, GovernmentToken.KnowledgeVerificationTestRate.HIGH, true); 
  
   govToken.delegate(user2);
   
   vm.stopPrank();

     vm.startPrank(user1);
    govToken.handInUserInitialTokens(GovernmentToken.TokenReceiveLevel.MEDIUM, GovernmentToken.TokenReceiveLevel.MEDIUM_LOW, GovernmentToken.TechnologyKnowledgeLevel.NOT_SELECTED, GovernmentToken.TokenReceiveLevel.MEDIUM, GovernmentToken.KnowledgeVerificationTestRate.HIGH, true); 
  
   govToken.delegate(user1);
   
   vm.stopPrank();

vm.roll(block.number + 1);

    uint256 snapshotBlock = block.number - 1; // or block.number if you want to use current
    uint256 balanceOfProposer = govToken.getPastVotes(user2, snapshotBlock);

console.log(balanceOfProposer, 'User Balance');

uint256 balanceOfProposer2 = govToken.getPastVotes(user1, snapshotBlock);

console.log(balanceOfProposer2, 'User Balance');

govToken.punishMember(user1, balanceOfProposer2 - balanceOfProposer * 1 / 500);
govToken.delegate(user1);

vm.roll(block.number + 2);

vm.prank(user1);
uint256 balanceOfProposer2AfterPunishment = govToken.getPastVotes(user1, block.number - 2);
console.log(balanceOfProposer2AfterPunishment, 'User Balance after punishment');

vm.expectRevert(CustomBuilderGovernor.NotElligibleToPropose.selector);

address[] memory targets;
uint256[] memory values;
bytes[] memory calldatas;


vm.prank(user1);
    customGovernor.createProposal("Coz I've said so though", targets, values, calldatas, CustomBuilderGovernor.UrgencyLevel.Medium, true, 0, block.timestamp + 604800);





}







}