require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  // solidity: "0.8.4",
  solidity: {
    compilers: [
      {
        version: "0.8.4"
      },
      {
        version: "0.6.6"
      },
      {
        version: "0.8.0"
      },
    ]
  },
  networks: {
    mumbai: {
      url: "https://matic-mumbai--jsonrpc.datahub.figment.io/apikey/03406ca0bd1f730425fe52737c108fca/",
      accounts: [
        process.env.PRIVATE_KEY_SELLER,
        process.env.PRIVATE_KEY_BUYER
      ]
    }
  },
  mocha: {
    timeout: 300000
  }
};
