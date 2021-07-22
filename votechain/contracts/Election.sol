pragma solidity ^0.5.8;

import "./safemath.sol";
import "./ownable.sol";

contract Election is Ownable {
    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath16 for uint16;

    struct Candidate {
        string name;
        string party;
        uint16 id;
        uint32 voteCount;
    }

    mapping(address => bool) public hasVoted;
    mapping(uint16 => Candidate) public candidates;
    mapping(address => uint256) public votes;

    uint16 public candidatesCount = 0;

    event VotedEvent(uint16 indexed _candidateId);

    constructor() public {
        addCandidate("Narendra D Modi", "Bharatiya Janata Party");
        addCandidate("Rahul Gandhi", "Indian National Congress");
        addCandidate("Akhilesh Yadav", "Samajvadi Party");
        addCandidate("Mamta Banarjee", "All India Trinamool Congress");
        addCandidate("Mayavti", "Bahujan Samaj Party");
        addCandidate("NOTA", "None of the above");
    }

    function addCandidate(string memory name, string memory party)
        public
        onlyOwner
    {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(
            name,
            party,
            0,
            candidatesCount
        );
    }

    function vote(uint16 _candidateId) public {
        require(!hasVoted[msg.sender]);
        require(_candidateId > 0 && _candidateId <= candidatesCount);
        hasVoted[msg.sender] = true;
        candidates[_candidateId].voteCount++;
        votes[msg.sender] = _candidateId;
        emit VotedEvent(_candidateId);
    }
}
