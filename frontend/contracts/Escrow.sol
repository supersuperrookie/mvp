import "./Overrides/IERC20.sol";
import "./Overrides/IERC721.sol";
import "./Overrides/IERC721Receiver.sol";
import "./Overrides/Ownable.sol";
import "hardhat/console.sol";
import "./Matic/ChildERC20.sol";
import "./Amho.sol";

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

    event Received(address, uint);
    event EscrowOrderInitiated(address indexed buyer, address seller, uint tokenId);
    event DepositedNFT(address indexed seller, address tokenAddress);
    event DepositedToken(address indexed buyer, uint amount);

    function setTokenAddresses(address _amho, address _token) public {
        amho = _amho;
        token = _token;
        addressSet = true;
    }

    function depositToken(uint256 _tokenId, uint256 amount) public {
        require(addressSet, "Addresses not set");

        // Get the seller of the NFT
        // address seller = IERC721(amho).ownerOf(_tokenId);

        // Build the escrow order

        escrowById[_tokenId] = EscrowOrder({
            buyer: payable(msg.sender),
            // NOTE: Cannot be the 0x0 address
            // seller: payable(seller),
            seller: payable(msg.sender),
            status: EscrowOrderState.depositedToken,
            value: amount
        });

        IERC20(token).transferFrom(msg.sender, address(this), amount);

        emit DepositedToken(msg.sender, amount);
        emit EscrowOrderInitiated(msg.sender, msg.sender, _tokenId);
    }

    function depositNFT(uint256 _tokenId) public {
        require(addressSet, "Addresses not set");

        // address seller = Amho(amho).ownerOf(_tokenId);

        // EscrowOrder storage order = escrowById[_tokenId];

        // if (order.seller != seller) {
        //     order.seller = payable(seller);
        // }

        // order.status = EscrowOrderState.depositedNFT;

        // NOTE: Cannot be the msg.sender !== from address 
        Amho(amho).transferFrom(msg.sender, address(this), _tokenId);

        emit DepositedNFT(msg.sender, address(amho));
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

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
}
