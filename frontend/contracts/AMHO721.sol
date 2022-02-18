// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AMHOToken is ERC721PresetMinterPauserAutoId {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    //is NFT locked
    mapping(uint256 => bool) public unlocked;
    mapping(uint256 => uint256) public lockTime;
    mapping(uint256 => bytes32) public hashedSecret;

    event UnlockedItem(uint256 nftId, address unlocker);

    constructor()
        ERC721PresetMinterPauserAutoId(
            "AMHOToken",
            "AMHO",
            "" //TODO: insert metadata url
        )
    {}

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        return string(abi.encodePacked(super.tokenURI(tokenId), ".json"));
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override {
        require(
            lockTime[tokenId] > block.timestamp || unlocked[tokenId],
            "AMHO item is locked bo"
        );
        super._beforeTokenTransfer(from, to, tokenId);
    }

    //called when buyer scans the QR code
    function unlockIt(bytes32 theHash, uint256 tokenId) public {
        require(
            msg.sender == ownerOf(tokenId),
            "AMHO items must be unlocked by their owner"
        ); //not 100% sure about that one yet
        require(
            keccak256(abi.encode(theHash)) == hashedSecret[tokenId],
            "that aint the amho code yo"
        );
        unlocked[tokenId] = true;
        emit UnlockedItem(tokenId, msg.sender);
    }

    //inner mint that triggers outter constructor
    function mint(
        address to,
        uint256 lockedAt,
        bytes32 theHash
    ) public {
        lockTime[_tokenIds.current()] = lockedAt;
        hashedSecret[_tokenIds.current()] = theHash;
        _tokenIds.increment();
        super.mint(to);
    }
}
