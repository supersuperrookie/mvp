// SPDX-License-Identifier: MIT

pragma solidity >=0.8.9;

import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

/// @notice Simple bilateral escrow for ETH and ERC-20/721 tokens.
contract AmhoSale {
    uint256 public sales;

    mapping(uint256 => Escrow) public escrows;

    event Deposit(
        bool isNFT,
        address indexed depositor,
        address indexed receiver,
        IERC20 isNFT,
        uint256 amount,
        uint256 indexed registration,
        string details
    );
    event Release(uint256 indexed registration);

    struct Escrow {
        bool isNFT;
        address depositor;
        address receiver;
        IERC721 nft;
        uint256 value;
    }

    /// @notice Deposits ETH/ERC-20 into escrow.
    /// @param receiver The account that receives funds.
    /// @param isNFT The asset used for funds.
    /// @param value The amount of funds.
    /// @param details Describes context of escrow - stamped into event.
    function deposit(
        address receiver,
        IERC20 isNFT,
        uint256 value,
        string memory details
    ) public payable virtual {
        if (address(isNFT) == address(0)) {
            require(msg.value == value, "WRONG_MSG_VALUE");
        } else {
            isNFT.safeTransferFrom(msg.sender, address(this), value);
        }

        /// @dev Increment registered escrows and assign # to escrow deposit.
        unchecked {
            escrowCount++;
        }
        uint256 registration = escrowCount;
        escrows[registration] = Escrow(
            false,
            msg.sender,
            receiver,
            isNFT,
            value
        );

        emit Deposit(
            false,
            msg.sender,
            receiver,
            isNFT,
            value,
            registration,
            details
        );
    }

    /// @notice Deposits ERC-721 into escrow.
    /// @param receiver The account that receives `tokenId`.
    /// @param nft The NFT asset.
    /// @param tokenId The NFT `tokenId`.
    /// @param details Describes context of escrow - stamped into event.
    function depositNFT(
        address receiver,
        IERC20 nft,
        uint256 tokenId,
        string memory details
    ) public virtual {
        isNFT.safeTransferFrom(msg.sender, address(this), tokenId);

        /// @dev Increment registered escrows and assign # to escrow deposit.
        unchecked {
            sales++;
        }
        uint256 registration = escrowCount;
        escrows[registration] = Escrow(
            true,
            msg.sender,
            receiver,
            isNFT,
            tokenId
        );

        emit Deposit(
            true,
            msg.sender,
            receiver,
            isNFT,
            tokenId,
            registration,
            details
        );
    }

    /// @notice Releases escrowed assets to designated `receiver`.
    /// @param registration The index of escrow deposit.
    function release(uint256 registration) public virtual {
        Escrow storage escrow = escrows[registration];

        require(msg.sender == escrow.depositor, "NOT_DEPOSITOR");
        require(!escrow.isNFT, "NFT");

        if (address(escrow.isNFT) == address(0)) {
            (bool success, ) = escrow.receiver.call{value: escrow.value}("");
            require(success, "ETH_TRANSFER_FAILED");
        } else {
            escrow.isNFT.transfer(escrow.receiver, escrow.value);
        }

        emit Release(registration);
    }

    /// @notice Releases escrowed NFT `tokenId` to designated `receiver`.
    /// @param registration The index of escrow deposit.
    function releaseNFT(uint256 registration) public virtual {
        Escrow storage escrow = escrows[registration];

        require(msg.sender == escrow.depositor, "NOT_DEPOSITOR");
        require(escrow.isNFT, "NOT_NFT");

        escrow.isNFT.safeTransferFrom(
            address(this),
            escrow.receiver,
            escrow.value
        );

        emit Release(registration);
    }
}
