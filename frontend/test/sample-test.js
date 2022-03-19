const { expect } = require("chai");
const { ethers } = require("hardhat");
const { randomBytes } = require("crypto");
const {POSClient} = require("@maticnetwork/maticjs");


describe("Contract Tests", function () {
  it("Create NFT and deposit it", async function () {
    // const [buyerAddress] = await ethers.getSigners();
    // secret = new Uint8Array(randomBytes(32));
    // hashedSecret = ethers.utils.solidityKeccak256(["bytes32"], [secret]);
    // const Escrow = await ethers.getContractFactory("Escrow");
    // const escrow = await Escrow.deploy();
    // await escrow.deployed();

    const posClient = new POSClient();
    const mumbaiAddress = posClient.erc20('0x0000000000000000000000000000000000001010');
    console.log(mumbaiAddress);
    // const escrowAddress = escrow.address;

    // const NFT = await ethers.getContractFactory("Amho");
    // // const nft = await NFT.deploy(escrowAddress);
    // const nft = await NFT.deploy();
    // await nft.deployed();

    // const nftAddress = nft.address;


    // // Set Token Addresses

    // await escrow.connect(buyerAddress).setTokenAddresses(nftAddress);

    // // MINT NFT

    // const cost = ".1";

    // const mintedId = await nft
    //   .connect(buyerAddress)
    //   .mintToken(hashedSecret, "https://amho.xyz");

    // // Approve Spend to Contract Address

    // await .connect(buyerAddress).approve(escrowAddress, ethers.utils.parseUnits(cost));

    // // Deposit token to escrow address

    // // await escrow
    // //   .connect(buyerAddress)
    // //   .depositToken(mintedId.value, ethers.utils.parseUnits(cost));
    // console.log(mintedId.value);

    // await escrow.connect(buyerAddress).depositNFT(mintedId.value);

    });
});
