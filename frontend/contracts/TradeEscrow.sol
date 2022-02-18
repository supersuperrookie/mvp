//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

// not currently using



contract Escrow {
    address payable public owner;
    uint256 public fee;
    uint256 collectedFee;
    IERC20 token;
    IER721 nft;

    event Deposited(
        address indexed payee,
        address tokenAddress,
        uint256 amount,
        address nft
    );
    event Withdrawn(
        address indexed payee,
        address tokenAddress,
        uint256 amount
    );

    // payee address => token address => amount
    mapping(address => mapping(address => uint256)) public deposits;

    // payee address => token address => expiration time
    mapping(address => mapping(address => uint256)) public expirations;

    constructor(IERC20 _token, uint256 _fee) {
        owner = payable(msg.sender);
        token = _token;
        fee = _fee;
    }

    modifier requiresFee() {
        require(msg.value >= fee, "Not enough value.");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Must be an owner.");
        _;
    }

    function transferFee() public onlyOwner {
        token.approve(owner, collectedFee);
        token.transfer(owner, collectedFee);
        collectedFee = 0;
    }

    function deposit(
        address _payee,
        uint256 _amount,
        uint256 _expiration
    ) public payable requiresFee {
        token.transferFrom(msg.sender, address(this), _amount + fee);
        deposits[_payee][address(token)] += _amount;
        expirations[_payee][address(token)] = block.timestamp + _expiration;
        collectedFee += fee;
        emit Deposited(_payee, address(token), _amount);
    }

    function withdraw(address payable _payee) public {
        require(
            block.timestamp > expirations[_payee][address(token)],
            "The payment is still in escrow."
        );
        uint256 payment = deposits[_payee][address(token)];
        deposits[_payee][address(token)] = 0;
        token.approve(_payee, payment);
        require(token.transfer(_payee, payment));
        emit Withdrawn(_payee, address(token), payment);
    }
}
