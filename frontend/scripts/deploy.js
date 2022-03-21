// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  const [signer] = await ethers.getSigners();
  const mumbaiMaticAddress = ethers.utils.getAddress("0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1")

  const Escrow = await ethers.getContractFactory("Escrow");
  escrow = await Escrow.deploy();
  await escrow.deployed();

  const NFT = await ethers.getContractFactory("Amho");
  nft = await NFT.deploy(ethers.utils.getAddress(escrow.address));
  await nft.deployed();

  console.log("AMHO deployed to: ", nft.address);

  await escrow
    .connect(signer)
    .setTokenAddresses(nft.address, mumbaiMaticAddress);

  console.log("Escrow deployed to: ", escrow.address);

  fs.writeFileSync(
    "./config.js",
    `export const escrowAddress = "${escrow.address}"
export const nftAddress = "${nft.address}"
export const maticAddress = "${mumbaiMaticAddress}"
`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
