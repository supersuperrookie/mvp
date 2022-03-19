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
library SharedStructs {

    enum ItemState {
        NEW,
        PENDING_INIT,
        PENDING_TETHER,
        TETHERED
    }

    struct TetherState {
        uint256 tokenId;
        address tetheredOwner;
        ItemState itemState;
        bytes32 secret;
    }
}

contract Amho is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    //

    /**
        NOTE: It has to match the following criteria:
        1. 
     */


    mapping(uint256 => SharedStructs.TetherState) public idToTetherData;
    mapping(uint256 => address) idToOwner;

    Escrow escrowContract;

    address payable escrowContractAddress;

    constructor(address payable _escrowContractAddress) ERC721("AMHO", "AMHO") {
    // constructor() ERC721("AMHO", "AMHO") {
        // owner = payable(msg.sender);
        escrowContractAddress = payable(_escrowContractAddress);
        escrowContract = Escrow(_escrowContractAddress);
    }


    function unlockById(uint256 _tokenId, bytes32 _secret) public {
        bytes32 secret = idToTetherData[_tokenId].secret;
        require(secret == _secret, "Unauthorized");
        escrowContract.releaseOrder(_tokenId);
    }

    function depositTokenToEscrow(uint256 _tokenId, uint256 _amount) public {
        // require(escrowContract.depositToken(_tokenId, _amount), "Tokens were not able to be deposited");
        escrowContract.depositToken(msg.sender, _tokenId, _amount);

        // TODO: Change state

    }

    function depositNftToEscrow(uint256 _tokenId) public {
        // require(escrowContract.depositNFT(_tokenId), "NFT was not able to be deposited");
        escrowContract.depositNFT(msg.sender, _tokenId);

        // TODO: Change state

    }

    // TODO: Mint NFT with secret code

    function mintToken(bytes32 secret, string memory tokenURI)
        public
        payable
        returns (uint256)
    {
        uint256 id = _tokenIds.current();

        // idToTetherData[id] = secret;
        // idToOwner[id] = msg.sender;
        idToTetherData[id] = SharedStructs.TetherState({
            tokenId: id,
            tetheredOwner: msg.sender,
            itemState: SharedStructs.ItemState.NEW,
            secret: secret
        });

        setApprovalForAll(escrowContractAddress, true);
        _mint(msg.sender, id);
        _setTokenURI(id, tokenURI);
        _tokenIds.increment();
        return id;
    }

    // TODO: Build Listing Contract
}
