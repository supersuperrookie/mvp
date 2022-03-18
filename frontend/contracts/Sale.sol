// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

/// @notice Simple bilateral escrow for ETH and ERC-20/721 tokens.
contract AmhoSale {
  using SafeERC20 for IERC20;

  enum ProjectState {
    newEscrow,
    nftDeposited,
    cancelNFT,
    paymentDeposited,
    canceledBeforeDelivery,
    deliveryInitiated,
    delivered,
    closed
  }

  //struct SaleFlow {
  address payable sellerAddress;
  address payable buyerAddress;
  address nftAddress;
  address paymentToken;
  uint256 nftID;
  uint256 price;
  bool buyerCancel;
  bool sellerCancel;
  ProjectState projectState;

  //}

  constructor() {
    sellerAddress = payable(msg.sender);
    projectState = ProjectState.newEscrow;
    buyerCancel = sellerCancel = false;
  }

  modifier onlySeller() {
    require(msg.sender == sellerAddress);
    _;
  }

  modifier onlyBuyer() {
    require(msg.sender == buyerAddress);
    _;
  }

  modifier noDispute() {
    require(!(buyerCancel || sellerCancel));
    _;
  }

  modifier inProjectState(ProjectState _state) {
    require(projectState == _state);
    _;
  }

  /* @dev Tells ERC-721 contracts that this contract can receive
   * ERC-721s (supports IERC721Receiver)
   */
  function onERC721Received(
    address operator,
    address from,
    uint256 tokenId,
    bytes calldata data
  ) public pure returns (bytes4) {
    return this.onERC721Received.selector;
  }

  function depositNFT(address _nftAddress, uint256 _tokenId)
    public
    payable
    inProjectState(ProjectState.newEscrow)
    onlySeller
  {
    nftAddress = _nftAddress;
    nftID = _tokenId;
    IERC721(nftAddress).safeTransferFrom(msg.sender, address(this), nftID);
    projectState = ProjectState.nftDeposited;
  }

  function depositPayment(ERC20 _paymentToken, uint256 _amount)
    public
    payable
    inProjectState(ProjectState.nftDeposited)
  {
    projectState = ProjectState.paymentDeposited;
    IERC20(_paymentToken).safeTransferFrom(msg.sender, address(this), _amount);
  }

  function cancelListing()
    public
    inProjectState(ProjectState.nftDeposited)
    onlySeller
  {
    IERC721(nftAddress).safeTransferFrom(address(this), msg.sender, nftID);
    projectState = ProjectState.cancelNFT;
  }

  // Seller Mails item
  function initiateDelivery()
    public
    inProjectState(ProjectState.paymentDeposited)
    onlySeller
    noDispute
  {
    projectState = ProjectState.deliveryInitiated;
  }

  function acknowledgeDelivery()
    public
    inProjectState(ProjectState.deliveryInitiated)
    onlyBuyer
  {
    projectState = ProjectState.delivered;
    IERC20(paymentToken).safeTransferFrom(address(this), sellerAddress, price);
    IERC721(nftAddress).safeTransferFrom(address(this), buyerAddress, nftID);
    projectState = ProjectState.closed;
  }

  /// @notice Provides EIP-2612 signed approval for this contract to spend user tokens.
  /// @param token Address of ERC-20 token.
  /// @param amount Token amount to grant spending right over.
  /// @param deadline Termination for signed approval in Unix time.
  /// @param v The recovery byte of the signature.
  /// @param r Half of the ECDSA signature pair.
  /// @param s Half of the ECDSA signature pair.
  function permitThis(
    address token,
    uint256 amount,
    uint256 deadline,
    uint8 v,
    bytes32 r,
    bytes32 s
  ) external {
    /// @dev permit(address,address,uint256,uint256,uint8,bytes32,bytes32).
    (bool success, ) = token.call(
      abi.encodeWithSelector(
        0xd505accf,
        msg.sender,
        address(this),
        amount,
        deadline,
        v,
        r,
        s
      )
    );
    require(success, "permit failed");
  }
}
