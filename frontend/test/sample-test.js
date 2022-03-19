const { ethers } = require("hardhat");
const { randomBytes } = require("crypto");


describe("Contract Tests", function () {
  it("Create NFT and deposit it", async function () {
    const [buyerAddress] = await ethers.getSigners();
    secret = new Uint8Array(randomBytes(32));

    hashedSecret = ethers.utils.solidityKeccak256(["bytes32"], [secret]);
    decimals = ethers.utils.solidityPack(["uint8"], [18]);

    const Escrow = await ethers.getContractFactory("Escrow");
    const escrow = await Escrow.deploy();
    await escrow.deployed();

    const escrowAddress = escrow.address;

    const NFT = await ethers.getContractFactory("Amho");
    // const nft = await NFT.deploy(escrowAddress);
    const nft = await NFT.deploy();
    await nft.deployed();

    const nftAddress = nft.address;

    /**
     * 
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        address childChainManager
     */
    const Matic = await ethers.getContractFactory("ChildERC20");
    const matic = await Matic.deploy("Mumbai Matic", "mMATIC", decimals, ethers.utils.getAddress('0xe44dbD837aA41F2814CDAc1ff03Df962f1Eb7D30'));
    await matic.deployed();

    // Set Token Addresses

    await escrow.connect(buyerAddress).setTokenAddresses(nftAddress);

    // MINT NFT

    const cost = ".1";

    const mintedId = await nft
      .connect(buyerAddress)
      .mintToken(hashedSecret, "https://amho.xyz");

    // Approve Spend to Contract Address

    const tx = await matic.connect(buyerAddress).approve(escrowAddress, ethers.utils.parseUnits(cost));
    console.log(tx)

    // Deposit token to escrow address

    // await escrow
    //   .connect(buyerAddress)
    //   .depositToken(mintedId.value, ethers.utils.parseUnits(cost));
    // console.log(mintedId.value);

    // await escrow.connect(buyerAddress).depositNFT(mintedId.value);

    });
});
