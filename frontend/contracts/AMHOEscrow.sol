// //SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/escrow/ConditionalEscrow.sol";

// // // Order {tokenId: string, owner: address, buyer:address, seller:address, code: <hashedSecretToUnlock>}

contract AMHOEscrow is ConditionalEscrow {
    // Events - publicize actions to external listeners
    event LogDepositMade(address accountAddress, uint256 amount);

    function start() external {
        require(!started, "started");
        require(msg.sender == seller, "not seller");

        nft.transferFrom(msg.sender, address(this), nftId);
        started = true;
        endAt = block.timestamp + 7 days;

        emit Start();
    }
}
