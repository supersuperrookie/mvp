import "hardhat/console.sol";
import "./Overrides/IERC20.sol";
import "./Overrides/IERC721.sol";
import "./Overrides/IERC721Receiver.sol";
import "./Overrides/Ownable.sol";
import "./Matic/ChildERC20.sol";
import "./Amho.sol";

contract Escrow is Ownable {
    address amho;
    address token;
    bool addressSet;

    enum EscrowOrderState {
        DEPOSITED_NFT,
        DEPOSITED_TOKEN
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

    function depositToken(address from, uint256 _tokenId, uint256 amount) external returns (bool) {
        require(addressSet, "Addresses not set");
        escrowById[_tokenId] = EscrowOrder({
            buyer: payable(from),
            // seller: payable(seller),
            seller: payable(msg.sender),
            status: EscrowOrderState.DEPOSITED_TOKEN,
            value: amount
        });

        console.log("Deposited from: ", from);
        bool success = IERC20(token).transferFrom(from, address(this), amount);

        emit DepositedToken(msg.sender, amount);
        emit EscrowOrderInitiated(msg.sender, msg.sender, _tokenId);

        return success;

    }

    function depositNFT(address from, uint256 _tokenId) external returns(bool) {
        require(addressSet, "Addresses not set");

        // address seller = Amho(amho).ownerOf(_tokenId);
        address seller = IERC721(amho).ownerOf(_tokenId);
        EscrowOrder storage order = escrowById[_tokenId];

        console.log("Deposited from: ", from);

        order.seller = payable(from);
        order.status = EscrowOrderState.DEPOSITED_NFT;

        IERC721(amho).transferFrom(payable(from), address(this), _tokenId);

        emit DepositedNFT(seller, address(amho));

        return true;
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
