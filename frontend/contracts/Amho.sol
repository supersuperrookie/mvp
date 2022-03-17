//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.4; 

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// Mint and Listing Contract

contract AMHO is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address public owner;

    mapping(uint256 => bytes32) idToSecret;
    mapping(uint256 => bool) idToSecretStatus;
    mapping(uint256 => address) idToOwner;

    address escrowContract;
    IERC20 escrowToken;
    IERC721 escrowNFT;

    constructor(IERC20 _escrowToken, IERC721 _escrowNFT, address _escrowContract) ERC721("AMHO", "AMHO") {
        owner = payable(msg.sender);

        escrowContract = _escrowContract;
        escrowToken = _escrowToken;
        escrowNFT = _escrowNFT;
    }

    function getSecretById(uint256 _tokenId) public view returns (bytes32) {
        return idToSecret[_tokenId];
    }

    function getSecretStatus(uint256 _tokenId) public view returns (bool) {
        return idToSecretStatus[_tokenId];
    }

    // TODO: Mint NFT with secret code

    function mintToken(bytes32 secret, string memory tokenURI) public payable returns (uint) {
        _tokenIds.increment();
        uint256 id = _tokenIds.current();

        idToSecret[id] = secret;
        idToOwner[id] = msg.sender;
        idToSecretStatus[id] = false;

        setApprovalForAll(escrowContract, true);
        _mint(msg.sender, id);
        _setTokenURI(id, tokenURI);

        return id;
    }

}