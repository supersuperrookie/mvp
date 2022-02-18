//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20TestToken is ERC20 {
    constructor() ERC20("Test ERC20", "T20") {
        _mint(msg.sender, 10000000000000);
    }
}
