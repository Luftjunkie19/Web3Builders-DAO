//SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import "../../lib/forge-std/src/Test.sol";
import {IVotes} from "../../lib/openzeppelin-contracts/contracts/governance/utils/IVotes.sol";
import {CustomBuilderGovernor} from "../../src/CustomGovernor.sol";
import {GovernmentToken} from "../../src/GovToken.sol";
import {console} from "../../lib/forge-std/src/console.sol";

import {DeployContract} from "../../script/GovernanceContracts.s.sol";

contract TestCustomDAO is Test {
event InitialTokensReceived(address indexed account);


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

uint256 sepolia_forkId;

event ProposalVoted(
        bytes32 id,
        address voter,
        uint256 weight
    );
 function setUp() public {
        deployer = new DeployContract();

sepolia_forkId= vm.createFork(SEPOLIA_FORK_URL)

// selectFork - selects the active fork
// createSelectFork - creates and selects the fork simultaneously
// rollFork

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

        // vm.expectEmit(true);

        // emit InitialTokensReceived(user1);

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
bytes32 proposalId =    customGovernor.createProposal("Coz I've said so though", proposalCreatedTargets, proposalCreatedValues, proposalCreatedCalldata, CustomBuilderGovernor.UrgencyLevel.Medium, false, block.timestamp + 604800, 1000, 3000);

govToken.delegate(user2);
vm.stopPrank();

CustomBuilderGovernor.Proposal memory wannaCastVoteFailProposal = customGovernor.getProposal(proposalId);


vm.startPrank(user2);
vm.expectRevert(CustomBuilderGovernor.VotingNotStarted.selector);
customGovernor.castVote(proposalId, 'Coz Im gonna kick your ass', user2, 0, "0xx", wannaCastVoteFailProposal.isCustom, true, false, indicies);
vm.stopPrank();

uint256 proposalsAmountAfterProposal = customGovernor.proposalCount();

assert(proposalsAmountAfterProposal > proposalsAmountBeforeProposal);

CustomBuilderGovernor.Proposal memory proposal = customGovernor.getProposal(proposalId);


assert(proposal.state == CustomBuilderGovernor.ProposalState.Pending);

vm.expectRevert(CustomBuilderGovernor.NotReadyToStart.selector);

customGovernor.activateProposal(proposalId);

CustomBuilderGovernor.Proposal memory proposalAfterFailed = customGovernor.getProposal(proposalId);

vm.expectRevert(CustomBuilderGovernor.InvalidProposalState.selector);

customGovernor.queueProposal(proposalId);


vm.warp(proposalAfterFailed.startBlockTimestamp + 200);

customGovernor.activateProposal(proposalId);

CustomBuilderGovernor.Proposal memory proposalAfterSuccess = customGovernor.getProposal(proposalId);

assert(proposalAfterSuccess.state == CustomBuilderGovernor.ProposalState.Active);




vm.prank(user2);
customGovernor.castVote(proposalId, 'Coz Im gonna kick your ass', user2, 0, "0xx", wannaCastVoteFailProposal.isCustom, true, false, indicies);



(uint256 yesVotes, uint256 noVotes, uint256 abstainVotes) = customGovernor.getStandardProposalVotes(proposalId);

console.log(yesVotes, noVotes, abstainVotes);

vm.warp(proposalAfterSuccess.endBlockTimestamp + 5);

customGovernor.succeedProposal(proposalId);

vm.warp(proposalAfterSuccess.succeededAt + 5);
customGovernor.queueProposal(proposalId);

CustomBuilderGovernor.Proposal memory proposalAfterQueued = customGovernor.getProposal(proposalId);


vm.warp(proposalAfterQueued.queuedAt + proposalAfterQueued.timelock + 5);
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



vm.startPrank(user2);
proposalCreatedTargets = [address(govToken), address(govToken)];
proposalCreatedValues = [0, 0];
proposalCreatedCalldata=[abi.encodeWithSignature("punishMember(address,uint256)", user2, 15e18), abi.encodeWithSignature("rewardUser(address,uint256)", user2, 20)];
bytes32 proposalId =    customGovernor.createProposal("Coz I've said so though", proposalCreatedTargets, proposalCreatedValues, proposalCreatedCalldata, CustomBuilderGovernor.UrgencyLevel.Medium, true, block.timestamp + 604800, 1000, 3000);

govToken.delegate(user2);
vm.stopPrank();

indicies=[1];
CustomBuilderGovernor.Proposal memory wannaCastVoteFailProposal = customGovernor.getProposal(proposalId);
console.log(wannaCastVoteFailProposal.isCustom);



vm.expectRevert(CustomBuilderGovernor.VotingNotStarted.selector);
vm.prank(user2);
customGovernor.castVote(proposalId, 'Coz Im gonna kick your ass', user2, 3, "0xx", wannaCastVoteFailProposal.isCustom, true, false, indicies);

CustomBuilderGovernor.Proposal memory proposalAfterFailed = customGovernor.getProposal(proposalId);

vm.warp(proposalAfterFailed.startBlockTimestamp + 5);

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


vm.warp(proposalAfterSuccess.endBlockTimestamp +4);

customGovernor.succeedProposal(proposalId);

CustomBuilderGovernor.Proposal memory proposalBeforeQueued = customGovernor.getProposal(proposalId);


console.log(uint8(proposalBeforeQueued.state),  'Proposal State Before Queued');

vm.warp(proposalBeforeQueued.succeededAt + 1);


customGovernor.queueProposal(proposalId);

CustomBuilderGovernor.Proposal memory proposalAfterQueued = customGovernor.getProposal(proposalId);

vm.startPrank(user2);
assert(proposalAfterQueued.state == CustomBuilderGovernor.ProposalState.Queued);

govToken.delegate(user2);


vm.warp(block.timestamp  + 2);


console.log(govToken.getPastVotes(msg.sender, block.number - 1), "User Balance Before Casting Vote");

vm.expectRevert(CustomBuilderGovernor.VotingPeriodOver.selector);

customGovernor.castVote(proposalId, 'Coz Im gonna kick your ass', user2, 3, "0xx", true, true, false, indicies);


vm.stopPrank();

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
    block.timestamp + 604800,
    1000,
    3000
);


vm.stopPrank();


// Advance time and activate proposal
CustomBuilderGovernor.Proposal memory proposal = customGovernor.getProposal(proposalId);
vm.warp(proposal.startBlockTimestamp + 5);
customGovernor.activateProposal(proposalId);

// Vote after activation
uint256[] memory indices= new uint256[](1); 
indices[0] = 1;


vm.startPrank(user2);
customGovernor.castVote(proposalId, "reason", user2, 3, "0x", true, true, false, indices);
vm.stopPrank();

vm.startPrank(user2);
vm.expectRevert(CustomBuilderGovernor.AlreadyVoted.selector);
customGovernor.castVote(proposalId, "reason", user2, 3, "0x", true, true, false, indices);
vm.stopPrank();

// Warp to end + delay, then queue & execute
vm.warp(proposal.endBlockTimestamp + 200);
customGovernor.succeedProposal(proposalId);

customGovernor.queueProposal(proposalId);



vm.expectRevert(CustomBuilderGovernor.ExecutionFailed.selector);

customGovernor.executeProposal(proposalId);


}


function testCheckIfStandardGetsQuorumError() public {
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

bytes32 proposalId =    customGovernor.createProposal("Coz I've said so though", proposalCreatedTargets, proposalCreatedValues, proposalCreatedCalldata, CustomBuilderGovernor.UrgencyLevel.Medium, false, block.timestamp + 604800,1000,3000);

govToken.delegate(user2);
vm.stopPrank();


CustomBuilderGovernor.Proposal memory proposal = customGovernor.getProposal(proposalId);

vm.warp(proposal.startBlockTimestamp + 5);

customGovernor.activateProposal(proposalId);

vm.expectRevert(CustomBuilderGovernor.
InvalidProposalState
.selector);
customGovernor.succeedProposal(proposalId);


vm.warp(proposal.endBlockTimestamp + 200);
customGovernor.succeedProposal(proposalId);

assert(uint8(customGovernor.getProposal(proposalId)
    .state) == uint8(CustomBuilderGovernor.ProposalState.Defeated));





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

bytes32 proposalId =    customGovernor.createProposal("Coz I've said so though", proposalCreatedTargets, proposalCreatedValues, proposalCreatedCalldata, CustomBuilderGovernor.UrgencyLevel.Medium, false, block.timestamp + 604800, 1000, 3000); 

govToken.delegate(user2);
vm.stopPrank();


CustomBuilderGovernor.Proposal memory proposal = customGovernor.getProposal(proposalId);


vm.warp(proposal.startBlockTimestamp + 5);

customGovernor.activateProposal(proposalId);


vm.prank(user2);
customGovernor.castVote(proposalId, 'Coz Im gonna kick your ass', user2, 0, "0xx", proposal.isCustom, true, false, indicies);


vm.warp(block.timestamp + proposal.endBlockTimestamp + 100);

customGovernor.succeedProposal(proposalId);

vm.warp(proposal.succeededAt + 1);

customGovernor.queueProposal(proposalId);


vm.expectRevert(CustomBuilderGovernor.ExecutionFailed.selector);

customGovernor.executeProposal(proposalId);



}


function testCheckIfCustomGetsQuorumNotReached() public {
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
    block.timestamp + 604800,
    1000,
    3000
);

vm.stopPrank();


// Advance time and activate proposal
CustomBuilderGovernor.Proposal memory proposal = customGovernor.getProposal(proposalId);
vm.warp(proposal.startBlockTimestamp + 5);
customGovernor.activateProposal(proposalId);

// Vote after activation
uint256[] memory indices= new uint256[](1); 
indices[0] = 1;

console.log(uint8(
    proposal.state
), 'Proposal State');


// Warp to end + delay, then queue & execute
vm.warp(proposal.endBlockTimestamp + 20);
customGovernor.succeedProposal(proposalId);

assert(uint8(customGovernor.getProposal(proposalId)
    .state) == uint8(CustomBuilderGovernor.ProposalState.Defeated));

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
    customGovernor.createProposal("Coz I've said so though", targets, values, calldatas, CustomBuilderGovernor.UrgencyLevel.Medium, true, block.timestamp + 604800, 1000, 3000);

}







}