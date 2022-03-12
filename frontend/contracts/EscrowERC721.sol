// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";


//NFT ERC721 
contract EscrowNFT721 is Ownable {

    address payable public buyer; 
    address payable public seller; 
    address public AMHOtoken; // address of ERC20 token 
    uint256 
    state public stateOf;  
    uint256 public fixfixDeposit;
    uint256 public IdNFT ; // NFT 

    enum state {Creation, Initiated, Sent, Received}; 
    event ExchangeStarted(address _buyer);

     modifier onlyBuyer() {
        require(buyer == msg.sender, "Function can be used only by buyer");
        _;
    }

     modifier onlySeller() {
         require(seller ==msg.sender, "Function can be used only by seller"); 
         _;
     }


    constructor(uint256) {
        buyer = payable(address(0));
        seller = payable(address(0)); 
        fixDeposit = 0;
        stateOf = state.Creation; 

    }

    function initiateNFTEscrow() public payable onlyBuyer() {
        require(buyer == address(0), "Buyer already exists, please enter new address")
        require(stateOf == state.Creation);
        require(msg.value == fixDeposit, "Check the fixDeposit amount"); 
        IERC721(AMHOtoken).transferFrom(msg.sender, address(this), IdNFT); 
        buyer = payable(msg.sender); 
        stateOf = state.Initiated; 
    }

     function sellerInitiate() public onlySeller() {
        require(stateOf == state.Initiated, " Wait for buyer to initiate the exchange");
        stateOf = state.Sent; 
    }

    // NFT is sent to buyer and for the seller the deposit 

    function ExchangeNFT() public onlyBuyer() {
        require(stateOf = state.Sent, " Seller should initiate the exchange");
        stateOf = state.Received; 
        IERC721(AMHOtoken).transferFrom(address(this), seller, IdNFT); 
        buyer.transfer(fixDeposit); 
    }


}
