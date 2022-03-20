pragma solidity ^0.8.0;

import './Overrides/ERC20.sol';

contract DummyToken is ERC20 {
    constructor() public ERC20("NAME", "SYMBOL") {
        // _mint(msg.sender, 1000);
    }

    function mintTo(address recipient) public {
        _mint(recipient, 10);
    }
}