require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    mumbai: {
      url: "https://matic-mumbai--jsonrpc.datahub.figment.io/apikey/03406ca0bd1f730425fe52737c108fca/",
      accounts: [
        process.env.PRIVATE_KEY
      ]
    }
  }
};
