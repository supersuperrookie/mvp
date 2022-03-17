import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Escrow is Ownable {
    IERC721 amho;
    IERC20 token;
    bool addressSet;

    enum EscrowOrderState {
        depositedNFT,
        depositedToken,
        pendingMate,
        mateSuccess
    }

    struct EscrowOrder {
        address buyer;
        address seller;
        uint256 value;
        EscrowOrderState status;
    }

    // Token ID to get order buyer, seller, and status

    mapping(uint256 => EscrowOrder) public escrowById;
    mapping(uint256 => address) public idToOwner;

    event DepositedNFT(address indexed seller, address tokenAddress);
    event DepositedToken(address indexed buyer, uint amount);

    function setTokenAddresses(IERC721 _amho, IERC20 _token) public onlyOwner {
        amho = _amho;
        token = _token;
    }

    function depositToken(uint256 _tokenId, uint256 amount) public {
        escrowById[_tokenId] = EscrowOrder({
            buyer: msg.sender,
            seller: idToOwner[_tokenId],
            status: EscrowOrderState.depositedToken,
            value: amount
        });
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        emit DepositedToken(msg.sender, amount);
    }

    function depositNFT(uint256 _tokenId) public {
        address seller = amho.ownerOf(_tokenId);
        EscrowOrder storage order = escrowById[_tokenId];
        order.seller = seller;
        order.status = EscrowOrderState.depositedNFT;
        IERC721(amho).transferFrom(seller, address(this), _tokenId);
        emit DepositedNFT(seller, address(amho));
    }

    function releaseOrder(uint256 _tokenId) internal {
        EscrowOrder memory escrowOrder = escrowById[_tokenId];
        address _buyer = escrowOrder.buyer;
        address _seller = escrowOrder.seller;
        uint256 _value = escrowOrder.value;
        amho.transferFrom(address(this), _buyer, _tokenId);
        token.transfer(_seller, _value);

    }
}
