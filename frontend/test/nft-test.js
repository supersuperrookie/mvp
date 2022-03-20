const { ethers } = require("hardhat");
const { randomBytes } = require("crypto");
const { expect } = require("chai");

const Artifact = require("../artifacts/@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol/LinkTokenInterface.json");

const LinkTokenABI = Artifact.abi;

describe("Escrow Deposit Flow", function () {
  beforeEach(async () => {
    [sellerAddress, buyerAddress] = await ethers.getSigners();
    secret = new Uint8Array(randomBytes(32));

    hashedSecret = ethers.utils.solidityKeccak256(["bytes32"], [secret]);
    decimals = ethers.utils.solidityPack(["uint8"], [18]);

    const Escrow = await ethers.getContractFactory("Escrow");
    escrow = await Escrow.deploy();
    await escrow.deployed();

    escrowAddress = escrow.address;

    const NFT = await ethers.getContractFactory("Amho");
    nft = await NFT.deploy(ethers.utils.getAddress(escrowAddress));
    await nft.deployed();

    nftAddress = nft.address;

    const DummyToken = await ethers.getContractFactory("DummyToken");
    dummyToken = await DummyToken.deploy();
    await dummyToken.deployed();

    await escrow
      .connect(sellerAddress)
      .setTokenAddresses(nftAddress, dummyToken.address);

    // MINT NFT

    cost = ethers.BigNumber.from(1);

    mintedId = await nft
      .connect(sellerAddress)
      .mintToken(hashedSecret, "https://amho.xyz", cost);

    mintedTokenId = mintedId.value;

    await dummyToken.mintTo(sellerAddress.address);
    await dummyToken.mintTo(buyerAddress.address);

    await dummyToken.connect(buyerAddress).approve(escrowAddress, cost);
  });

  describe("NFT Mint and Deposit", async () => {
    it("Mint and check state", async function () {
      // const Matic = await ethers.getContractFactory("ChildERC20");
      // const matic = await Matic.deploy(
      //   "Mumbai Matic",
      //   "mMATIC",
      //   decimals,
      //   ethers.utils.getAddress("0xe44dbD837aA41F2814CDAc1ff03Df962f1Eb7D30")
      // );
      // await matic.deployed();
      const testOwner = await nft.ownerOf(mintedTokenId);
      expect(testOwner).to.equal(sellerAddress.address);
      const result = await nft.getNFTState(mintedTokenId);
      expect(result.itemState).to.equal(0);
    });
    it("Deposit token and check status", async () => {
      await nft.connect(buyerAddress).depositTokenToEscrow(mintedTokenId, cost);
      const result = await nft.getNFTState(mintedTokenId);
      expect(result.itemState).to.equal(1);
    });

    it("Deposit NFT and check status", async () => {
      await nft.connect(sellerAddress).depositNftToEscrow(mintedTokenId);
      const result = await nft.getNFTState(mintedTokenId);
      expect(result.itemState).to.equal(2);
    });

    it("Deposits to escrow and check if struct updated", async () => {
      await nft.connect(buyerAddress).depositTokenToEscrow(mintedTokenId, cost);
      await nft.connect(sellerAddress).depositNftToEscrow(mintedTokenId);

      expect(await dummyToken.balanceOf(escrowAddress)).to.equal(1);
      expect(await nft.ownerOf(mintedTokenId)).to.equal(escrowAddress);

      const result = await nft.getNFTState(mintedTokenId);

      // NOTE: Struct tests

      expect(result["price"]).to.equal(cost);
      expect(result["currentOwner"]).to.equal(sellerAddress.address);
      expect(result["nextOwner"]).to.equal(buyerAddress.address);
      expect(result["secret"]).to.equal(hashedSecret);
    });

    it("Release NFT from escrow, update buyer and seller", async () => {
      // TODO: Move cost into the function and compare with msg.value

      await nft.connect(buyerAddress).depositTokenToEscrow(mintedTokenId, cost);
      await nft.connect(sellerAddress).depositNftToEscrow(mintedTokenId);

      const result = await escrow.getEscrowOrderById(mintedTokenId);

      const retTokenId = await nft
        .connect(buyerAddress)
        .releaseOrderToEscrow(mintedTokenId, hashedSecret);

      expect(result["seller"]).to.equal(sellerAddress.address);
      expect(result["buyer"]).to.equal(buyerAddress.address);

      const sellerBal = await dummyToken.balanceOf(sellerAddress.address);
      expect(sellerBal).to.equal(11);
      expect(await nft.ownerOf(retTokenId.value)).to.equal(
        buyerAddress.address
      );
      // TODO: QR Scanned
    });
  });

  it("Oracle should work", async () => {
    const randomAddress = "0x31458c55Fc0f1666c1B2e72a12F1530e853868Ce";
    await nft.connect(buyerAddress).depositTokenToEscrow(mintedTokenId, cost);
    await nft
      .connect(sellerAddress)
      .transferFrom(sellerAddress.address, randomAddress, mintedTokenId);
    await nft.gasOpOracleCheckUntethered();

    const result = await nft.getNFTState(mintedTokenId);

    expect(result.itemState).to.equal(4);
  });
});

describe.only("LINK test", async () => {
  it("Get random number for QR Code", async () => {
    const VRFConsumer = await ethers.getContractFactory("VRFConsumer");
    vrfConsumer = await VRFConsumer.deploy();
    await vrfConsumer.deployed();

    [sellerAddress, buyerAddress] = await ethers.getSigners();

    linkTokenContract = new ethers.Contract(
      "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
      LinkTokenABI,
      sellerAddress
    );

    const tx = await linkTokenContract.transfer(
      vrfConsumer.address,
      "1000000000000000000"
    );
    await tx.wait();
    console.log("hash: ", tx.hash);

    let randomTransaction = await vrfConsumer.getRandomNumber();
    let tx_receipt = await randomTransaction.wait();
    const requestId = tx_receipt.events[2].topics[1];

    const result = await vrfConsumer.randomResult();
    console.log("result: ", new ethers.BigNumber.from(result._hex).toString());
    await new Promise(resolve => setTimeout(resolve, 60000));
    const finalResult = await vrfConsumer.getRandomResult();
    console.log(finalResult);
  });
});
