const { expect } = require("chai");
const { ethers } = require("hardhat");
const { randomBytes } = require("crypto");
describe("Contract Tests", function () {
  it("Create NFT and deposit it", async function () {
    const [buyerAddress] = await ethers.getSigners();
    secret = new Uint8Array(randomBytes(32));
    hashedSecret = ethers.utils.solidityKeccak256(["bytes32"], [secret]);
    const Escrow = await ethers.getContractFactory("Escrow");
    const escrow = await Escrow.deploy();
    await escrow.deployed();

    const escrowAddress = escrow.address;

    const NFT = await ethers.getContractFactory("Amho");
    // const nft = await NFT.deploy(escrowAddress);
    const nft = await NFT.deploy();
    await nft.deployed();

    const nftAddress = nft.address;

    escrow
      .connect(buyerAddress)
      .setTokenAddresses(
        nftAddress
      );

    const mintedId = await nft.connect(buyerAddress).mintToken(hashedSecret, "https://amho.xyz");
    await escrow.connect(buyerAddress).depositToken(mintedId.value, ethers.utils.parseUnits(".1"));
  });
});
