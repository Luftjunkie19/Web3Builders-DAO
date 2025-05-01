// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import {Script} from "../lib/forge-std/src/Script.sol";

import {CustomBuilderGovernor} from "../src/CustomGovernor.sol";
import {GovernmentToken} from "../src/GovToken.sol";
import {IVotes} from "../lib/openzeppelin-contracts/contracts/governance/utils/IVotes.sol";
contract DeployContract
is Script {
    GovernmentToken govToken;
    CustomBuilderGovernor customGovernor;


    function run() public returns(CustomBuilderGovernor, GovernmentToken){
vm.startBroadcast();
govToken = new GovernmentToken();
customGovernor = new CustomBuilderGovernor(IVotes(address(govToken)));
vm.stopBroadcast();

return(customGovernor, govToken);
    }

}