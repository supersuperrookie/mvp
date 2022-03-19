// SPDX-License-Identifier: MIT

pragma solidity >= 0.8.0;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

/// @title A guessing game 
/// @author Mehdi R. 
/// @notice You can use this contract for only the most basic simulation
/// @dev All function calls are currently implemented without side effects
/// @custom:experimental This is only for testing use. 
contract Randomness is VRFConsumerBase {

    uint public //;
    //uint public minimumBet; 
    //uint private winner; 
    //uint [] guesses; 


    bytes32 internal keyHash;
    uint256 internal fee;
    
    uint256 public randomResult;

    // List of the 5 users who made a bet 
    address payable [] public users ; 


    struct user {
        uint amount;
        uint article; 
    }
    // storing the amount and article of each user 
    mapping(address => user) userId; 
    mapping(address => uint) balances; 
    mapping(uint => uint) trackerarticle; 
    mapping(uint => address) addressTracker; 

    event userWithdrawal(address user, uint amount);


    //// CONSTRUCTOR

     /**
     * Constructor inherits VRFConsumerBase
     * 
     * Network: Mumbai Testnet
     * Chainlink VRF Coordinator address: 0x8C7382F9D8f56b33781fE506E897a4F1e2d17255
     * LINK token address:                0x326C977E6efc84E512bB9C30f76E30c160eD06FB
     * Key Hash: 0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4
     */

     //https://docs.chain.link/docs/vrf-contracts/v1/ for addresses
    constructor() 
        VRFConsumerBase(
            0x8C7382F9D8f56b33781fE506E897a4F1e2d17255, // VRF Coordinator
            0x326C977E6efc84E512bB9C30f76E30c160eD06FB  // LINK Token
        )
    {
        keyHash = 0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4;
        fee = 0.1 * 10 ** 18 ; // 0.1 LINK (Varies by network)
        //minimumDeposit = 100; //0.0011 ether 
        //maxusers = 5; 
    }


    /** 
     * Requests randomness 
     */
    function getRandomNumber() public returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
        return requestRandomness(keyHash, fee);
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        // get random number between 1 and 1000
        randomResult = randomness % 1000 + 1;
    }

  

    /// @notice if a _user has already bought this article
    /// @param  _user address in the range of //
    /// @return boolean : true if _user has already made a bet
    function userExists(address _user) public view returns(bool) {
        for(uint16 i=0; i< users.length; i++){
            if (users[i] == _user) return true; 
        }
        return false ; 
    }

    /// @notice a user can choose to bet on a number 
    /// @param _article is a number between 0 and 10
    
    /**function BettingOnNumber(uint _article) public payable {
        require(!userExists(msg.sender)); 
        require(msg.value >= minimumBet); 
        require(_article <= 10); 

        userId[msg.sender].amount = msg.value ; 
        userId[msg.sender].article = _article ;

        users.push(payable(msg.sender));

    }*/

    /// @notice withdraw function, substract amount from user balance and send the amount 
    /// @param amount to withdraw 

    function withdraw(uint amount) public payable {
        require(balances[msg.sender] >= amount, "not enought funds");
        balances[msg.sender] -= amount; 
        payable(msg.sender).transfer(amount); 
        emit userWithdrawal(msg.sender, amount); 

    }

    /// @notice withdraw all function, send remaining balance back to user

    function withdrawaAll() public payable {
        require(balances[msg.sender] > 0, "no funds");
        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
        emit userWithdrawal(msg.sender, amount); 
    }

    //function getBalance(uint _minDistance, uint _article) public view returns(uint){
         //for (uint i=0; i<users.length; i++){
          //   if (_article = _minDistance){
            //    return balances[addressTracker]+= 1 ether ; 
           //  }
       // }

    //}

    /// @param article  : user bet
    /// @param randomResult : winning guess
    /// @return distance 

    //function distance(uint article, uint randomResult) internal pure returns(uint) {
    //    return article > randomResult ? article - randomResult : randomResult - article ; 
    //}

    /** computes min distance
    function minDistance(uint [] memory guesses, uint randomResult) internal pure returns(uint) {
        uint d = distance(guesses[0],  randomResult);

        for(uint i=1; i<guesses.length; i++) {
            if(distance(guesses[i], randomResult) <d) {
                d = distance(guesses[i], randomResult);

            }
        }
        return d;
    }*/

    /// @notice checks the users who have reached the minDistance
    /// @param  _minDistance refers to the minDistance result computaion 
    /// @param  randomResult is calculated with randomness LINK 

    /**function numOfWinningusers(uint _minDistance, uint randomResult) internal view returns(uint) {
        uint num=0;

        for(uint i=1; i<//; i++) {
            if(distance(trackerarticle[i], randomResult) == _minDistance) {
                num++;
            }
        }
        return num;
    }*/

    
    /**function payout() internal {

        for(uint i=0; i< //; i++) {
            guesses.push(trackerarticle[i]);
        }

        uint _minDistance = minDistance(guesses, randomResult);
        uint numOfWinners = numOfWinningusers(_minDistance, randomResult);
        uint amount = // * 1 ether / numOfWinners; 

            for(uint i=1; i<guesses.length; i++) {
                if(distance(guesses[i], randomResult) == _minDistance) {
                    balances[addressTracker[i]] += amount; 
                }
            }
    }*/




    

}