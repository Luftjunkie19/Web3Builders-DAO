//SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import {Test} from "../../lib/forge-std/src/Test.sol";
import {IVotes} from "../../lib/openzeppelin-contracts/contracts/governance/utils/IVotes.sol";
import {CustomBuilderGovernor} from "../../src/CustomGovernor.sol";
import {GovernmentToken} from "../../src/GovToken.sol";
import {console} from "../../lib/forge-std/src/console.sol";

contract TestCustomDAO is Test {

    CustomBuilderGovernor public customGovernor;
    GovernmentToken public govToken;

    address public user1 = makeAddr("user1");
    address public user2 = makeAddr("user2");
    address public user3 = makeAddr("user3");

    function setUp() public {
        govToken = new GovernmentToken();
        customGovernor = new CustomBuilderGovernor(IVotes(address(govToken)));
    }

function testToken() public view {
    assertEq(address(customGovernor.getGovToken()), address(govToken), "Token address mismatch");
    }



}