const { ethers } = require("hardhat");
const { randomBytes } = require("crypto");
const { execSync } = require("child_process");

describe("Deploy and Deposit", function () {
  it("Create NFT, Deposit token and NFT", async function () {
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
    const nft = await NFT.deploy(ethers.utils.getAddress(escrowAddress));
    await nft.deployed();

    const nftAddress = nft.address;

    /**
     * 
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        address childChainManager
     */

    // const Matic = await ethers.getContractFactory("ChildERC20");
    // const matic = await Matic.deploy(
    //   "Mumbai Matic",
    //   "mMATIC",
    //   decimals,
    //   ethers.utils.getAddress("0xe44dbD837aA41F2814CDAc1ff03Df962f1Eb7D30")
    // );
    // await matic.deployed();

    const DummyToken = await ethers.getContractFactory("DummyToken");
    const dummyToken = await DummyToken.deploy();
    await dummyToken.deployed();
    // Set Token Addresses
    console.log("Buyer Address", buyerAddress.address);
    console.log("NFT deployed at: ", nft.address);
    console.log("Token deployed at: ", dummyToken.address);

    await escrow
      .connect(buyerAddress)
      .setTokenAddresses(nftAddress, dummyToken.address);

    console.log("Escrow deployed at: ", escrow.address);

    // MINT NFT

    const cost = ethers.BigNumber.from(1);

    const mintedId = await nft
      .connect(buyerAddress)
      .mintToken(hashedSecret, "https://amho.xyz");
    
    const ownerOf = await nft.ownerOf(mintedId.value);


    // Approve Spend to Contract Address

    // await matic.connect(buyerAddress).approve(escrowAddress, cost);

    // Deposit token to escrow address

    await dummyToken.mintTo(buyerAddress.address);
    await dummyToken.connect(buyerAddress).approve(escrowAddress, cost)

    await dummyToken.connect(buyerAddress).approve(nftAddress, cost);
    await dummyToken.connect(buyerAddress).approve(escrowAddress, cost);

    // await escrow.connect(buyerAddress).depositToken(mintedId.value, cost);
    // await escrow.connect(buyerAddress).depositNFT(mintedId.value);

    await nft.connect(buyerAddress).depositTokenToEscrow(mintedId.value, cost);

    await nft.connect(buyerAddress).depositNftToEscrow(mintedId.value);



  });

  // it("Minted NFT Secret Should Match Hash", async function() {
  //   const [buyerAddress] = await ethers.getSigners();
  //   secret = new Uint8Array(randomBytes(32));

  //   hashedSecret = ethers.utils.solidityKeccak256(["bytes32"], [secret]);
  //   decimals = ethers.utils.solidityPack(["uint8"], [18]);

  //   const Escrow = await ethers.getContractFactory("Escrow");
  //   const escrow = await Escrow.deploy();
  //   await escrow.deployed();
  //   const escrowAddress = escrow.address;
  // })


});
