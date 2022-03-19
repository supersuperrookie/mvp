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
    //
    enum ItemState {
        NEW,
        PENDING,
        PENDING_INIT,
        PENDING_TETHER,
        SHIPPED,
        TETHERED
    }

    address public owner;

    mapping(uint256 => bytes32) idToSecret;
    mapping(uint256 => bool) idToSecretStatus;
    mapping(uint256 => address) idToOwner;

    Escrow escrowContract;

    address payable escrowContractAddress;

    constructor(address payable _escrowContractAddress) ERC721("AMHO", "AMHO") {
    // constructor() ERC721("AMHO", "AMHO") {
        // owner = payable(msg.sender);
        escrowContractAddress = payable(_escrowContractAddress);
        escrowContract = Escrow(_escrowContractAddress);
    }

    function getSecretById(uint256 _tokenId) public view returns (bytes32) {
        return idToSecret[_tokenId];
    }

    function getSecretStatus(uint256 _tokenId) public view returns (bool) {
        return idToSecretStatus[_tokenId];
    }

    function unlockById(uint256 _tokenId, bytes32 _secret) public {
        bytes32 secret = idToSecret[_tokenId];
        require(secret == _secret, "Unauthorized");
        escrowContract.releaseOrder(_tokenId);
    }

    // TODO: Mint NFT with secret code

    // function mintToken(bytes32 secret, string memory tokenURI) public payable returns (uint) {
    function mintToken(bytes32 secret, string memory tokenURI)
        public
        payable
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 id = _tokenIds.current();

        idToSecret[id] = secret;
        idToOwner[id] = msg.sender;
        idToSecretStatus[id] = false;

        setApprovalForAll(escrowContractAddress, true);
        _mint(msg.sender, id);
        _setTokenURI(id, tokenURI);
        return id;
    }

    // TODO: Build Listing Contract
}
