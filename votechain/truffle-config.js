module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" 
    }
  },
  plugins : ["solidity-coverage"],
  mocha: {
    // timeout: 100000
    reporter: 'eth-gas-reporter',
    reporterOptions: {
        excludeContracts: ['Migrations'],
    }
  }
};