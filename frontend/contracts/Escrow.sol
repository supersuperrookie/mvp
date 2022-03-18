//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract Escrow is Ownable {
    address amho;
    address token;
    bool addressSet;

    enum EscrowOrderState {
        depositedNFT,
        depositedToken,
        pendingMate,
        mateSuccess
    }

    struct EscrowOrder {
        address payable buyer;
        address payable seller;
        uint256 value;
        EscrowOrderState status;
    }

    // Token ID to get order buyer, seller, and status

    mapping(uint256 => EscrowOrder) public escrowById;
    mapping(uint256 => address) public idToOwner;

    // TODO: Add statuses to each EscrowOrderState

    event EscrowOrderInitiated(address indexed buyer, address seller, uint tokenId);
    event DepositedNFT(address indexed seller, address tokenAddress);
    event DepositedToken(address indexed buyer, uint amount);

    function setTokenAddresses(address _amho) public {
        amho = _amho;
        token = 0x0000000000000000000000000000000000001010;

        addressSet = true;
    }

    function depositToken(uint256 _tokenId, uint256 amount) public {
        require(addressSet, "Addresses not set");

        address seller = IERC721(amho).ownerOf(_tokenId);
        escrowById[_tokenId] = EscrowOrder({
            buyer: payable(msg.sender),
            seller: payable(seller),
            status: EscrowOrderState.depositedToken,
            value: amount
        });

        IERC20(token).transferFrom(msg.sender, address(this), amount);
        console.log("Transferring coins to", address(this));

        emit DepositedToken(msg.sender, amount);
        emit EscrowOrderInitiated(msg.sender, seller, _tokenId);
    }

    function depositNFT(uint256 _tokenId) public {
        require(addressSet, "Addresses not set");

        address seller = IERC721(amho).ownerOf(_tokenId);
        EscrowOrder storage order = escrowById[_tokenId];
        order.seller = payable(seller);
        order.status = EscrowOrderState.depositedNFT;
        IERC721(amho).transferFrom(payable(seller), address(this), _tokenId);
        emit DepositedNFT(seller, address(amho));
    }

    function releaseOrder(uint256 _tokenId) external {
        EscrowOrder memory escrowOrder = escrowById[_tokenId];

        address _buyer = escrowOrder.buyer;
        address _seller = escrowOrder.seller;
        uint256 _value = escrowOrder.value;

        IERC721(amho).transferFrom(address(this), _buyer, _tokenId);
        IERC20(token).transfer(_seller, _value);
        delete escrowById[_tokenId];
    }
}
