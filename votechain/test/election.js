const Election = artifacts.require("Election");
var expect = require('chai').expect;
const utils = require("./helper/utils");
const candidateids = [0,1,2];
contract("Election", (accounts) => {

    let [alice,bob] = accounts;
    let contractInstance;
    beforeEach(async () => {
        contractInstance = await Election.new();
    });


    it("initializes with five candidates along with the parties", async () => {
        let count = parseInt(await contractInstance.current_count());
        expect(count).to.equal(6);
      });
    
      it("it initializes the candidates with the correct values", function() {
        return Election.deployed().then(function(instance) {
          electionInstance = instance;
          return electionInstance.candidates(1);
        }).then(function(candidate) {
          assert.equal(candidate.name,"Narendra D Modi");
          assert.equal(candidate.party,"Bharatiya Janata Party");
          assert.equal(parseInt(candidate.id), 0);
          assert.equal(candidate.voteCount,0);
          return electionInstance.candidates(2);
        }).then(function(candidate) {
            assert.equal(candidate.name,"Rahul Gandhi");
            assert.equal(candidate.party, "Indian National Congress");
            assert.equal(candidate.id,1);
            assert.equal(candidate.voteCount,0);
          return electionInstance.candidates(3);
        }).then(function(candidate) {
            assert.equal(candidate.name,"Akhilesh Yadav");
            assert.equal(candidate.party,"Samajvadi Party");
            assert.equal(candidate.id,2);
            assert.equal(candidate.voteCount,0);
          return electionInstance.candidates(4);
        }).then(function(candidate) {
            assert.equal(candidate.name,"Mamta Banarjee");
            assert.equal(candidate.party,"All India Trinamool Congress");
            assert.equal(candidate.id,3);
            assert.equal(candidate.voteCount,0);
          return electionInstance.candidates(5);
        }).then(function(candidate) {
            assert.equal(candidate.name,"Mayavti");
            assert.equal(candidate.party, "Bahujan Samaj Party");
            assert.equal(candidate.id,4);
            assert.equal(candidate.voteCount,0);
          return electionInstance.candidates(6);
        }).then(function(candidate) {
            assert.equal(candidate.name, "NOTA");
            assert.equal(candidate.party, "None of the above");
            assert.equal(candidate.id,5);
            assert.equal(candidate.voteCount,0);
        });
      });
    
      it("allows a voter to cast a vote", async() => {
        const result = await contractInstance.vote(1,{from: accounts[0]});
        //expect(parseInt(result.logs[0].args._candidateId)).to.equal(1);
        expect(result.logs[0].args.status).to.equal(true);
      });
    
      it("throws an exception for invalid candidates", async() =>{
        let count = parseInt(await contractInstance.current_count());  
        await utils.shouldThrow(contractInstance.vote(100));
      });
    
      xit("throws an exception for double voting", function() {
        return Election.deployed().then(function(instance) {
          electionInstance = instance;
          candidateId = 2;
          electionInstance.vote(candidateId, { from: accounts[1] });
          return electionInstance.candidates(candidateId);
        }).then(function(candidate) {
          var voteCount = candidate[3];
          assert.equal(voteCount, 1, "accepts first vote");
          // Try to vote again
          return electionInstance.vote(candidateId, { from: accounts[1] });
        }).then(assert.fail).catch(function(error) {
          assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
          return electionInstance.candidates(1);
        }).then(function(candidate1) {
          var voteCount = candidate1[3];
          assert.equal(voteCount, 1, "candidate 1 did not receive any votes");
          return electionInstance.candidates(2);
        }).then(function(candidate2) {
          var voteCount = candidate2[3];
          assert.equal(voteCount, 1, "candidate 2 did not receive any votes");
        });
      });
    });
    