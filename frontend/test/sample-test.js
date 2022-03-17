const { expect } = require('chai');
const { ethers } = require("hardhat")

describe("Smart Contract Tests", function() {

    this.beforeEach(async function() {
        // This is executed before each test
                const TestBags = await ethers.getContractFactory("TestBags");
                testBags = await TestBags.deploy("Test Bags", "BAGS");
    })

    it("NFT is minted successfully", async function() {

        [account1] = await ethers.getSigners();
        console.log(account1)
        const tokenURI = "https://opensea-creatures-api.herokuapp.com/api/creature/1"
        const tx = await testBags.connect(account1).mint(tokenURI);
        console.log(tx)

    })

})