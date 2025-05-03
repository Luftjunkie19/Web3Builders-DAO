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

address[] proposalCreatedTargets;
uint256[] proposalCreatedValues;
bytes[] proposalCreatedCalldata; 

uint256[]  indicies;

 function setUp() public {
        deployer = new DeployContract();

(customGovernor, govToken) = deployer.run();

        govToken = new GovernmentToken();
        customGovernor = new CustomBuilderGovernor(IVotes(address(govToken)));
    }



function testGetIVotesToken() public view {
    assert(address(customGovernor.getIVotesToken()) == address(govToken)); 
}

function testgetProposalCount() public view {
    assert(customGovernor.getProposalCount() == 0);
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
        vm.startPrank(user1);
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
    govToken.handInUserInitialTokens(GovernmentToken.TokenReceiveLevel.MEDIUM, GovernmentToken.TokenReceiveLevel.MEDIUM_LOW, GovernmentToken.TechnologyKnowledgeLevel.NOT_SELECTED, GovernmentToken.TokenReceiveLevel.MEDIUM, GovernmentToken.KnowledgeVerificationTestRate.HIGH, true);  


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

uint256 proposalsAmountBeforeProposal = customGovernor.proposalCount();


proposalCreatedTargets = [user2];
proposalCreatedValues = [0];
proposalCreatedCalldata=[abi.encodeWithSignature("rewardUser(address,uint256)", user2, 15e18)];
indicies.push(0);

vm.startPrank(user2);
bytes32 proposalId =    customGovernor.createProposal("Coz I've said so though", proposalCreatedTargets, proposalCreatedValues, proposalCreatedCalldata, CustomBuilderGovernor.UrgencyLevel.Medium, false, 2400, block.timestamp + 604800); 

govToken.delegate(user2);
vm.stopPrank();

CustomBuilderGovernor.Proposal memory wannaCastVoteFailProposal = customGovernor.getProposal(proposalId);

vm.expectRevert(CustomBuilderGovernor.VotingNotStarted.selector);

vm.prank(user2);



customGovernor.castVote(proposalId, 'Coz Im gonna kick your ass', user2, 0, "0xx", wannaCastVoteFailProposal.isCustom, true, false, indicies);


uint256 proposalsAmountAfterProposal = customGovernor.proposalCount();

assert(proposalsAmountAfterProposal > proposalsAmountBeforeProposal);

CustomBuilderGovernor.Proposal memory proposal = customGovernor.getProposal(proposalId);


assert(proposal.state == CustomBuilderGovernor.ProposalState.Pending);

vm.expectRevert(CustomBuilderGovernor.NotReadyToStart.selector);

customGovernor.activateProposal(proposalId);

CustomBuilderGovernor.Proposal memory proposalAfterFailed = customGovernor.getProposal(proposalId);

vm.warp(block.timestamp + proposalAfterFailed.votingDelay + 2);

customGovernor.activateProposal(proposalId);


CustomBuilderGovernor.Proposal memory proposalAfterSuccess = customGovernor.getProposal(proposalId);

assert(proposalAfterSuccess.state == CustomBuilderGovernor.ProposalState.Active);


vm.prank(user2);
customGovernor.castVote(proposalId, 'Coz Im gonna kick your ass', user2, 0, "0xx", wannaCastVoteFailProposal.isCustom, true, false, indicies);


(uint256 yesVotes, uint256 noVotes, uint256 abstainVotes) = customGovernor.getStandardProposalVotes(proposalId);

console.log(yesVotes, noVotes, abstainVotes);


vm.warp(block.timestamp + proposalAfterSuccess.endBlockTimestamp + 100);
customGovernor.queueProposal(proposalId);

CustomBuilderGovernor.Proposal memory proposalAfterQueued = customGovernor.getProposal(proposalId);

vm.warp(block.timestamp + proposalAfterQueued.endBlockTimestamp + 1);


customGovernor.executeProposal(proposalId);

CustomBuilderGovernor.Proposal memory proposalAfterExecuted = customGovernor.getProposal(proposalId);

console.log(uint8(proposalAfterExecuted.state), "Proposal State After Executed");

vm.expectRevert(CustomBuilderGovernor.InvalidProposalState.selector);

customGovernor.cancelProposal(proposalAfterQueued.id);

}

function testDecimals() public view {
    assertEq(govToken.decimals(), 18);
}

function testGetNonces() public {
vm.prank(user1);
govToken.handInUserInitialTokens(
    GovernmentToken.TokenReceiveLevel.MEDIUM,
    GovernmentToken.TokenReceiveLevel.MEDIUM_LOW,
    GovernmentToken.TechnologyKnowledgeLevel.NOT_SELECTED,
    GovernmentToken.TokenReceiveLevel.MEDIUM,
    GovernmentToken.KnowledgeVerificationTestRate.HIGH,
    true
);
govToken.readMemberInfluence(user1);
    assertEq(govToken.nonces(user1), 0);
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


vm.startPrank(user2);
proposalCreatedTargets = [address(govToken), address(govToken)];
proposalCreatedValues = [0, 0];
proposalCreatedCalldata=[abi.encodeWithSignature("punishMember(address,uint256)", user2, 15e18), abi.encodeWithSignature("rewardUser(address,uint256)", user2, 20)];
bytes32 proposalId =    customGovernor.createProposal("Coz I've said so though", proposalCreatedTargets, proposalCreatedValues, proposalCreatedCalldata, CustomBuilderGovernor.UrgencyLevel.Medium, true, 2400, block.timestamp + 604800); 

govToken.delegate(user2);
vm.stopPrank();

indicies=[1];
CustomBuilderGovernor.Proposal memory wannaCastVoteFailProposal = customGovernor.getProposal(proposalId);
console.log(wannaCastVoteFailProposal.isCustom);



vm.expectRevert(CustomBuilderGovernor.VotingNotStarted.selector);
vm.prank(user2);
customGovernor.castVote(proposalId, 'Coz Im gonna kick your ass', user2, 3, "0xx", wannaCastVoteFailProposal.isCustom, true, false, indicies);


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

vm.startPrank(user2);
govToken.handInUserInitialTokens(
GovernmentToken.TokenReceiveLevel.MEDIUM,
GovernmentToken.TokenReceiveLevel.MEDIUM_LOW,
GovernmentToken.TechnologyKnowledgeLevel.NOT_SELECTED,
GovernmentToken.TokenReceiveLevel.MEDIUM,
GovernmentToken.KnowledgeVerificationTestRate.HIGH,
true
);
govToken.delegate(user2);


vm.warp(block.timestamp  + 2);


console.log(govToken.getPastVotes(msg.sender, block.number - 1), "User Balance Before Casting Vote");
customGovernor.castVote(proposalId, 'Coz Im gonna kick your ass', user2, 3, "0xx", true, true, false, indicies);
vm.stopPrank();


vm.warp(block.timestamp + proposalAfterSuccess.endBlockTimestamp + 604800);

CustomBuilderGovernor.Proposal memory proposalBeforeQueued = customGovernor.getProposal(proposalId);

CustomBuilderGovernor.HighestVotedCustomOption[5] memory customVoteCount = customGovernor.getCustomProposalVotes(proposalId);

console.log(customVoteCount.length, 'Custom Vote Count After Queued');

(uint256[] memory customIndicies, bool isCustomExecutable)= customGovernor.insertionSort(customVoteCount, proposalId);


console.log(customIndicies.length, 'Custom Vote Indicies to calldata Count');
console.log(isCustomExecutable, 'Custom Vote Executable');



console.log(uint8(proposalBeforeQueued.state),  'Proposal State Before Queued');


customGovernor.queueProposal(proposalId);

CustomBuilderGovernor.Proposal memory proposalAfterQueued = customGovernor.getProposal(proposalId);

assert(proposalAfterQueued.state == CustomBuilderGovernor.ProposalState.Queued);


customGovernor.executeProposal(proposalId);

CustomBuilderGovernor.Proposal memory proposalAfterExecuted = customGovernor.getProposal(proposalId);

assert(proposalAfterExecuted.state == CustomBuilderGovernor.ProposalState.Executed);

}


function testGetCustomRevertedExecutedProposalId() public  {
    vm.startPrank(user2);

// Mint and delegate tokens
govToken.handInUserInitialTokens(
    GovernmentToken.TokenReceiveLevel.MEDIUM,
    GovernmentToken.TokenReceiveLevel.MEDIUM_LOW,
    GovernmentToken.TechnologyKnowledgeLevel.NOT_SELECTED,
    GovernmentToken.TokenReceiveLevel.MEDIUM,
    GovernmentToken.KnowledgeVerificationTestRate.HIGH,
    true
);
govToken.delegate(user2);
vm.roll(block.number + 5);
govToken.delegate(user2);
uint256 pastVotes = govToken.getPastVotes(user2, block.number - 1);
console.log(pastVotes, 'User Balance Before Casting Vote');
// Create proposal
proposalCreatedTargets = [address(govToken), address(govToken)];
proposalCreatedValues = [0, 0];
 proposalCreatedCalldata = [
    abi.encodeWithSignature("punishMember(address,uint256)", user2, 15e18),
    abi.encodeWithSignature("rewartUser(address,uint256)", user2, 20)
];
bytes32 proposalId = customGovernor.createProposal(
    "because I say so",
    proposalCreatedTargets,
    proposalCreatedValues,
    proposalCreatedCalldata,
    CustomBuilderGovernor.UrgencyLevel.Medium,
    true,
    2400,
    block.timestamp + 604800
);
vm.stopPrank();

// Advance block so snapshot works




// Advance time and activate proposal
CustomBuilderGovernor.Proposal memory proposal = customGovernor.getProposal(proposalId);
vm.warp(block.timestamp + proposal.votingDelay + 1);
customGovernor.activateProposal(proposalId);

// Vote after activation
uint256[] memory indices= new uint256[](1); 
indices[0] = 1;



vm.startPrank(user2);
customGovernor.castVote(proposalId, "reason", user2, 3, "0x", true, true, false, indices);
vm.stopPrank();

// Warp to end + delay, then queue & execute
vm.warp(block.timestamp + proposal.endBlockTimestamp + 604800);
customGovernor.queueProposal(proposalId);

vm.expectRevert(CustomBuilderGovernor.ExecutionFailed.selector);

customGovernor.executeProposal(proposalId);


}


function testCheckIfStandardGetsExecutionError() public {
vm.startPrank(user2);

// Mint and delegate tokens
govToken.handInUserInitialTokens(
    GovernmentToken.TokenReceiveLevel.MEDIUM,
    GovernmentToken.TokenReceiveLevel.MEDIUM_LOW,
    GovernmentToken.TechnologyKnowledgeLevel.NOT_SELECTED,
    GovernmentToken.TokenReceiveLevel.MEDIUM,
    GovernmentToken.KnowledgeVerificationTestRate.HIGH,
    true
);

govToken.delegate(user2);
vm.roll(block.number + 5);
govToken.delegate(user2);
uint256 pastVotes = govToken.getPastVotes(user2, block.number - 1);
console.log(pastVotes, 'User Balance Before Casting Vote');
// Create proposal

proposalCreatedTargets = [address(govToken)];
proposalCreatedValues = [0];
proposalCreatedCalldata=[abi.encodeWithSignature("rewardsgUser(address,uint256)", user2, 15e18)];
indicies.push(0);

bytes32 proposalId =    customGovernor.createProposal("Coz I've said so though", proposalCreatedTargets, proposalCreatedValues, proposalCreatedCalldata, CustomBuilderGovernor.UrgencyLevel.Medium, false, 2400, block.timestamp + 604800); 

govToken.delegate(user2);
vm.stopPrank();


CustomBuilderGovernor.Proposal memory proposal = customGovernor.getProposal(proposalId);


vm.warp(block.timestamp + proposal.votingDelay + 2);

customGovernor.activateProposal(proposalId);


vm.prank(user2);
customGovernor.castVote(proposalId, 'Coz Im gonna kick your ass', user2, 0, "0xx", proposal.isCustom, true, false, indicies);


vm.warp(block.timestamp + proposal.endBlockTimestamp + 100);
customGovernor.queueProposal(proposalId);



vm.warp(block.timestamp + proposal.endBlockTimestamp + 1);

vm.expectRevert(CustomBuilderGovernor.ExecutionFailed.selector);

customGovernor.executeProposal(proposalId);





}





function testRewardingWorksProperly() public {

 vm.startPrank(user2);
    govToken.handInUserInitialTokens(GovernmentToken.TokenReceiveLevel.MEDIUM, GovernmentToken.TokenReceiveLevel.MEDIUM_LOW, GovernmentToken.TechnologyKnowledgeLevel.NOT_SELECTED, GovernmentToken.TokenReceiveLevel.MEDIUM, GovernmentToken.KnowledgeVerificationTestRate.HIGH, true); 
  
   govToken.delegate(user2);
   
   vm.stopPrank();

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