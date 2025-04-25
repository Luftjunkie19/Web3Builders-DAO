// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {ERC20Permit} from "../lib/openzeppelin-contracts/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {ERC20Votes} from "../lib/openzeppelin-contracts/contracts/token/ERC20/extensions/ERC20Votes.sol";
import {VotesExtended} from "../lib/openzeppelin-contracts/contracts/governance/utils/VotesExtended.sol";
import {Nonces} from "../lib/openzeppelin-contracts/contracts/utils/Nonces.sol";
import {Votes} from "../lib/openzeppelin-contracts/contracts/governance/utils/Votes.sol";
import {Ownable} from "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract GovernmentToken is ERC20, Ownable, ERC20Permit, ERC20Votes, VotesExtended {

error IntialTokensAlreadyReceived();
error MaliciousActionsLimitReached();
error SupplySurpassed();

event InitialTokensReceived(address indexed account);
event UserRewarded(address indexed account, uint256 indexed amount);
event UserPunished(address indexed account, uint256 indexed amount);


  mapping(address => bool) public receivedInitialTokens;
  mapping(address=>uint256) public userMaliciousActions;
  uint256 public constant initial_token_user_amount = 1000 * 10**18;
  uint256 public constant malicious_actions_limit = 3;
  uint256 public constant MAX_SUPPLY = 19 * 10**24;

    constructor() Ownable(msg.sender) ERC20("BuilderToken", "BUILD") ERC20Permit("BuilderToken") {

    } 

fallback() external {
  
}

    modifier hasExceededSupply(){
      if(totalSupply() >= MAX_SUPPLY) {
        revert SupplySurpassed();
        }
        _;
    }

function totalSupply () public view virtual override(ERC20) returns (uint256) {
  return super.totalSupply();
}

function owner() public view virtual override(Ownable) returns (address) {
  return super.owner();
}

function decimals() public view virtual override(ERC20) returns (uint8) {
  return 18;
}



// Internal functions (Contract Callable)
function _maxSupply() internal view virtual override(ERC20Votes) returns (uint256) {
  return 19 * 10**(decimals() + 6);
}

function _mint(address account, uint256 amount) internal override(ERC20) hasExceededSupply {
super._mint(account, amount);
}

function _burn(address account, uint256 amount) internal override(ERC20) {
super._burn(account, amount);
}


function _update(address from, address to, uint256 amount) internal override(ERC20, ERC20Votes) {
super._update(from, to, amount);
}


function _transferVotingUnits(address from, address to, uint256 amount) internal  virtual override(Votes, VotesExtended) {
super._transferVotingUnits(from, to, amount);
}


  function _getVotingUnits(address account) internal view override(Votes, ERC20Votes) returns (uint256) {
     return super._getVotingUnits(account);
  }

function _delegate(address account, address delegatee) internal virtual override(Votes, VotesExtended) {
 super._delegate(account, delegatee);
}


  // Public functions (User-Interactive)
function handInUserInitialTokens() public  {

  if(receivedInitialTokens[msg.sender] == true) {
        emit UserPunished(msg.sender, initial_token_user_amount / 10);
        punishMember(msg.sender, initial_token_user_amount / 10);
        return;
      }

  _mint(msg.sender, initial_token_user_amount);
  receivedInitialTokens[msg.sender] = true;
  emit InitialTokensReceived(msg.sender);
}

function rewardUser(address user, uint256 amount) public {
  _mint(user, amount);
emit UserRewarded(user, amount);
}


function punishMember(address user, uint256 amount) public {
  if (userMaliciousActions[user] >= malicious_actions_limit) {
    _burn(user, super.balanceOf(user));
  } else {
    _burn(user, amount);
    userMaliciousActions[user] += 1;
  }
}

function increaseUserMaliciousActions(address user) public {
  userMaliciousActions[user] += 1;
}

function readMemberInfluence(address user) public view returns (uint256) {
  return _getVotingUnits(user);
}

function transfer(address to, uint256 amount) public override(ERC20) returns (bool) {
return super.transfer(to, amount);
}

function approve(address spender, uint256 amount) public override(ERC20) returns (bool) {
return super.approve(spender, amount);
}

function nonces(address _owner) public view virtual override(ERC20Permit, Nonces) returns (uint256) {
return super.nonces(_owner);
}

function delegate(address delegatee) public virtual override(Votes) {
  super.delegate(delegatee);
}


function getPastBalanceOf(address account, uint256 timepoint) public view virtual override(VotesExtended) returns (uint256) {
  return super.getPastBalanceOf(account, timepoint);
}

function getPastVotes(address account, uint256 timepoint) public view virtual override(Votes) returns (uint256) {
  return super.getPastVotes(account, timepoint);
}

}