// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.24;

// import {IGovernor, Governor} from "@openzeppelin/contracts/governance/Governor.sol";

// import {GovernorStorage} from "@openzeppelin/contracts/governance/extensions/GovernorStorage.sol";
// import {GovernorCountingSimple} from "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
// import {GovernorVotes} from "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
// import {GovernorVotesQuorumFraction} from "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
// import {GovernorTimelockControl} from "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";
// import {TimelockController} from "@openzeppelin/contracts/governance/TimelockController.sol";
// import {IVotes} from "@openzeppelin/contracts/governance/utils/IVotes.sol";
// import {IERC165} from "@openzeppelin/contracts/interfaces/IERC165.sol";
// import {IERC5805} from "@openzeppelin/contracts/interfaces/IERC5805.sol";
// import {ERC20Votes} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";


// contract MyGovernor is
//     Governor,
//     GovernorCountingSimple,
//     GovernorVotes,
//     GovernorVotesQuorumFraction,
//     GovernorTimelockControl
// {

// ERC20Votes public immutable govToken;


//     constructor(
//         IVotes _token,
//         TimelockController _timelock
//     ) Governor("MyGovernor") GovernorVotes(_token) GovernorVotesQuorumFraction(20) GovernorTimelockControl(_timelock) {
//         govToken = ERC20Votes(address(_token));
//     }

//     function token() public view override(GovernorVotes) returns(IERC5805) {
//         return super.token();
//     }
//     function votingDelay() public pure override returns (uint256) {
//         return 7200; // 1 day
//     }

//     function votingPeriod() public pure override returns (uint256) {
//         return 50400; // 1 week
//     }

//     function proposalThreshold() public view override returns (uint256) {
//         return govToken.totalSupply() / 200;
//     }

//     // The functions below are overrides required by Solidity.

//     function state(uint256 proposalId) public view override(Governor, GovernorTimelockControl) returns (ProposalState) {
//         return super.state(proposalId);
//     }


//     function _queueOperations(
//         uint256 proposalId,
//         address[] memory targets,
//         uint256[] memory values,
//         bytes[] memory calldatas,
//         bytes32 descriptionHash
//     ) internal override(Governor, GovernorTimelockControl) returns (uint48) {
//         return super._queueOperations(proposalId, targets, values, calldatas, descriptionHash);
//     }

//     function _cancel(
//         address[] memory targets,
//         uint256[] memory values,
//         bytes[] memory calldatas,
//         bytes32 descriptionHash
//     ) internal override(Governor, GovernorTimelockControl) returns (uint256) {
//         return super._cancel(targets, values, calldatas, descriptionHash);
//     }

//     function _getVotes(address account, uint256 timepoint, bytes memory params) internal view override(Governor, GovernorVotes) returns (uint256) {
//         return super._getVotes(account, timepoint, params);
//     }

//     function proposalEta(uint256 proposalId) public view override(Governor) returns (uint256) {
//         return super.proposalEta(proposalId);
//     }

// function propose(address[] memory targets, uint256[] memory values, bytes[] memory calldatas, string memory description) public override(Governor) returns (uint256) {
//         return super.propose(targets, values, calldatas, description);
//     }

// function execute(address[] memory targets, uint256[] memory values, bytes[] memory calldatas, bytes32 descriptionHash) public payable override(Governor) returns (uint256) {
//         return super.execute(targets, values, calldatas, descriptionHash);
// }



// function _executeOperations(
//         uint256 proposalId,
//         address[] memory targets,
//         uint256[] memory values,
//         bytes[] memory calldatas,
//         bytes32 descriptionHash
// ) internal override(Governor, GovernorTimelockControl) {
//         super._executeOperations(proposalId, targets, values, calldatas, descriptionHash);
// }


// function _propose(address[] memory targets, uint256[] memory values, bytes[] memory calldatas, string memory description, address proposer) internal override(Governor) returns (uint256) {
//         return super._propose(targets, values, calldatas, description, proposer);
//     }

// function castVoteWithReason(uint256 proposalId, uint8 support, string calldata reason) public override(Governor) returns (uint256) {
// return super.castVoteWithReason(proposalId, support, reason);
//  }

// function queue(address[] memory targets, uint256[] memory values, bytes[] memory calldatas, bytes32 descriptionHash) public override(Governor) returns (uint256) {
//         return super.queue(targets, values, calldatas, descriptionHash);
// }

//     function proposalVotes(uint256 proposalId) public view override returns (uint256 againstVotes, uint256 forVotes, uint256 abstainVotes) {
//         return super.proposalVotes(proposalId);
//     }

//     function proposalNeedsQueuing(
//         uint256 proposalId
//     ) public view virtual override(Governor, GovernorTimelockControl) returns (bool) {
//         return super.proposalNeedsQueuing(proposalId);
//     }

//     function proposalDeadline (uint256 proposalId) public view override(Governor) returns (uint256) {
//         return super.proposalDeadline(proposalId);
//     }

//     function _executor() internal view override(Governor, GovernorTimelockControl) returns (address) {
//         return super._executor();
//     }
// }