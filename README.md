# VoteChain
![Ethereum](https://img.shields.io/badge/Ethereum-A6A9AA?style=for-the-badge&logo=ethereum&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

### Description
This is Ethereum based decentralized voting portal. This is a blockchain based project along with web3js to link it with html. Blockchain technology is one of the most secure technologies in today's time. This is a project to see a basic implementation of this technology in a voting system. In this project we have used ethereum to implement this voting system.

### How to Run
One of the pre-requisites for running this project is ganache. Procedure for installation of ganache can be found at https://www.npmjs.com/package/ganache-cli. You also need to have the web3js javascript library and the Metamask extension on your browser.

1) Start your Ganache and configure it to run on the same port as you've mentioned in the "truffle-config.js" file. You can run ganache using npm run ganache
2) Once Ganache is up and running, go to the project directory and type the following command in the terminal "npm run dev". Once this is successfully completed, the server will start on your machine.
3) Open your browser and type the url localhost:[port number]. The port number is provided on your terminal when the server is run. You should now see the hosted web page.
4) Now, synchronize the Metamask with our Ganache. This allows for easy access to the dummy ether for testing.
5) To cast your vote, choose the candidate for whom you want to vote and click the final submit button. A pop-up will appear from the Metamask and you will be asked to confirm the transaction.
