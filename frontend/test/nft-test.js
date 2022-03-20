const { ethers } = require("hardhat");
const { randomBytes } = require("crypto");
const { expect } = require("chai");

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
    it("Check of owner before deposit", async function () {
      // const Matic = await ethers.getContractFactory("ChildERC20");
      // const matic = await Matic.deploy(
      //   "Mumbai Matic",
      //   "mMATIC",
      //   decimals,
      //   ethers.utils.getAddress("0xe44dbD837aA41F2814CDAc1ff03Df962f1Eb7D30")
      // );
      // await matic.deployed();
      expect(await nft.ownerOf(mintedId.value)).to.equal(sellerAddress.address);
    });

    it("Deposit token to escrow and check if struct updated", async () => {
      await nft
        .connect(buyerAddress)
        .depositTokenToEscrow(mintedId.value, cost);
      await nft.connect(sellerAddress).depositNftToEscrow(mintedId.value);

      expect(await dummyToken.balanceOf(escrowAddress)).to.equal(1);
      expect(await nft.ownerOf(mintedId.value)).to.equal(escrowAddress);

      const result = await nft.getNFTState(mintedId.value);

      // NOTE: Struct tests

      expect(result["currentOwner"]).to.equal(sellerAddress.address);
      expect(result["secret"]).to.equal(hashedSecret);
      expect(result["itemState"]).to.equal(0);
    });

    it("Release NFT from escrow and ensure the buyer and seller get their stuff", async () => {
      // TODO: Move cost into the function and compare with msg.value

      await nft.connect(buyerAddress).depositTokenToEscrow(mintedTokenId, cost);
      await nft.connect(sellerAddress).depositNftToEscrow(mintedTokenId);

      const result = await escrow.getEscrowOrderById(mintedTokenId);

      const retTokenId = await nft.connect(buyerAddress).releaseOrderToEscrow(mintedTokenId, hashedSecret);

      expect(result["seller"]).to.equal(sellerAddress.address);
      expect(result["buyer"]).to.equal(buyerAddress.address);

      const sellerBal = await dummyToken.balanceOf(sellerAddress.address);
      expect(sellerBal).to.equal(11);
      expect(await nft.ownerOf(retTokenId.value)).to.equal(buyerAddress.address);
      // TODO: QR Scanned

    });
  });
});
