const Election = artifacts.require("./Election.sol");
const fs = require('fs')
const path = '/../src/Metadata.js'
module.exports = function (deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(Election).then(() => {
    fs.writeFile(
      __dirname + path,
      'const ADDRESS = ' + "'" + Election.address + "';",
      (err) => {
        if (err) {
          console.log(err)
        } else {
        }
      },
    )
    fs.appendFile(
      __dirname + path,
      '\nconst ABI = ' + JSON.stringify(Election.abi) + ';',
      (err) => {
        if (err) {
          console.log(err)
        } else {
          fs.appendFile(
            __dirname + path,
            '\nmodule.exports = { ADDRESS, ABI };',
            (err) => {
              if (err) {
                console.log(err)
              }
            },
          )
        }
      },
    )
  })
}