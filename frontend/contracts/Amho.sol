//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./Escrow.sol";
import "./Overrides/ERC721.sol";
import "./Overrides/IERC20.sol";
import "./Overrides/IERC721.sol";
import "./Overrides/Counters.sol";
import "./Overrides/ERC721URIStorage.sol";
import "hardhat/console.sol";

// Mint and Listing Contract
contract Amho is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // NOTE: Enum values will be used to show the state of the item on the frontend

    enum ItemState {
        NEW,
        PENDING_INIT,
        PENDING_TETHER,
        TETHERED
    }

    struct NFTState {
        uint256 tokenId;
        uint256 price;
        address tetheredOwner;
        ItemState itemState;
        bytes32 secret;
    }


    address payable escrowContractAddress;
    Escrow escrowContract;

    mapping(uint256 => NFTState) idToNFTState;
    mapping(uint256 => address) idToOwner;

    constructor(address payable _escrowContractAddress) ERC721("AMHO", "AMHO") {
        // constructor() ERC721("AMHO", "AMHO") {
        // owner = payable(msg.sender);
        escrowContractAddress = payable(_escrowContractAddress);
        escrowContract = Escrow(_escrowContractAddress);
    }

    function getTetheredData(uint256 _tokenId)
        public
        view
        returns (NFTState memory)
    {
        return idToNFTState[_tokenId];
    }

    function getSecret(uint256 _tokenId) external view returns (bytes32) {
        NFTState memory orderState = getTetheredData(_tokenId);
        return orderState.secret;
    }

    function unlockById(uint256 _tokenId, bytes32 _secret) public {
        bytes32 secret = idToNFTState[_tokenId].secret;
        require(secret == _secret, "Unauthorized");
        escrowContract.releaseOrder(_tokenId, _secret);
    }

    // TODO: Price match between the price of the minted token and msg.value

    function depositTokenToEscrow(uint256 _tokenId, uint256 _amount) public {
        require(
            escrowContract.depositToken(msg.sender, _tokenId, _amount),
            "Tokens were not able to be deposited."
        );

        // TODO: Change state
    }

    function depositNftToEscrow(uint256 _tokenId) public {
        require(
            escrowContract.depositNFT(msg.sender, _tokenId),
            "NFT was not able to be deposited."
        );

        // TODO: Change state
    }

    function releaseOrderToEscrow(address from, uint256 _tokenId, bytes32 _secret) public {
        require(from == idToNFTState[_tokenId].tetheredOwner);
        escrowContract.releaseOrder(_tokenId, _secret);
    }

    function mintToken(
        bytes32 secret,
        string memory tokenURI,
        uint256 _price
    ) public payable returns (uint256) {
        uint256 id = _tokenIds.current();

        setApprovalForAll(escrowContractAddress, true);
        _mint(msg.sender, id);
        console.log("Minted to: ", msg.sender);
        idToNFTState[id] = NFTState({
            price: _price,
            tokenId: id,
            tetheredOwner: msg.sender,
            itemState: ItemState.NEW,
            secret: secret
        });

        _setTokenURI(id, tokenURI);

        _tokenIds.increment();

        return id;
    }
}
