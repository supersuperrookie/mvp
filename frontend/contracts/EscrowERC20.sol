//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Escrow20 is Ownable {
    address payable public buyer; 
    address payable public seller; 
    address public AMHOtoken; 
    state public stateOf;  
    uint256 public amount; 
    uint256 public fixDeposit;

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
        amount = 0; 
        deposit = 0;
        stateOf = state.Creation; 
    }

    function initiateEscrow() public payable onlyBuyer() {
        require(stateOf == state.Creation, "Contract not deployed");
        require(buyer == address(0), 'Should be a new buyer'); 
        IERC20(AMHOtoken).transferFrom(msg.sender, address(this), amount);
        buyer = payable(msg.sender); 
        stateOf = state.Initiated; 
        emit ExchangeStarted(msg.sender); 
    }

    function sellerInitiate() public onlySeller() {
        require(stateOf == state.Initiated, " Wait for buyer to initiate the exchange");
        stateOf = state.Sent; 
    }

    function ExchangeBackToBuyer() public onlyBuyer() {
        require(stateOf = state.Sent, " Seller should initiate the exchange");
        stateOf = state.Received; 
        IERC20(AMHO.token).transfer(buyer, deposit); 
        IERC20(AMHO.token).transfer(seller, amount); 
    }


}