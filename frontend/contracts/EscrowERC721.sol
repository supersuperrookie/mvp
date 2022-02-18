// //SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

// This is a reference im tinkering with

contract EscrowERC721 {
    address payable public creator;
    uint256 public feeAmount;
    uint256 counter;
    uint256 feeReceived;
    IERC20 feeToken;
    IERC721 nftItem;

    struct ERC721Item {
        address seller;
        address buyer;
        uint256 item;
        uint256 expiration;
    }

    mapping(uint256 => ERC721Item) public erc721Items;

    event Deposited(
        uint256 id,
        address indexed payee,
        address tokenAddress,
        uint256 item
    );
    event Withdrawn(
        uint256 id,
        address indexed payee,
        address tokenAddress,
        uint256 item
    );

    constructor(
        IERC721 _nft,
        IERC20 _feeToken,
        uint256 _fee
    ) {
        creator = payable(msg.sender);
        nftItem = _nft;
        feeToken = _feeToken;
        feeAmount = _fee;
        counter = 0;
    }

    modifier requiresFee() {
        require(msg.value < feeAmount);
        _;
    }

    modifier onlycreator() {
        require(msg.sender == creator, "Must be the escrow creator.");
        _;
    }

    function transferFee() public onlycreator {
        feeToken.approve(creator, feeReceived);
        feeToken.transfer(creator, feeReceived);
        feeReceived = 0;
    }

    function deposit(
        address _payee,
        uint256 _item,
        uint256 _expiration
    ) public payable requiresFee {
        require(
            msg.sender == nftItem.ownerOf(_item),
            "Sender is not a nftItem creator."
        );
        nftItem.transferFrom(msg.sender, address(this), _item);
        feeToken.transferFrom(msg.sender, address(this), feeAmount);
        uint256 id = counter;
        erc721Items[id] = ERC721Item({
            seller: _payee,
            buyer: msg.sender,
            item: _item,
            expiration: block.timestamp + _expiration
        });
        counter += 1;
        feeReceived += feeAmount;
        emit Deposited(id, _payee, address(nftItem), _item);
    }

    function withdraw(uint256 _id) public {
        require(
            block.timestamp > erc721Items[_id].expiration,
            "The item is still in escrow."
        );
        address seller = erc721Items[_id].seller;
        uint256 item = erc721Items[_id].item;
        delete (erc721Items[_id]);
        IERC721(address(nftItem)).transferFrom(address(this), seller, item);
        emit Withdrawn(_id, seller, address(nftItem), item);
    }
}
