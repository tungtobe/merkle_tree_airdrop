// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
pragma abicoder v2;
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PhoneAirdrop is Ownable {
    bytes32 public merkleRoots;

    constructor(bytes32 _merkleRoots) public {
        merkleRoots = _merkleRoots;
    }

    function verifyClaim(
        address _userAddress,
        uint256 _balance,
        bytes32[] memory _merkleProof
    ) public view returns (bool valid) {
        bytes32 leaf = keccak256(
            abi.encodePacked(_userAddress, _balance)
        );
        return MerkleProof.verify(_merkleProof, merkleRoots, leaf);
    }

    function testKeccak256Hash(address _userAddress, uint256 _balance)
        public
        view
        returns (bytes32 proof)
    {
        return keccak256(abi.encodePacked(_userAddress, _balance));
    }

    function testABIEncodedPacked(address _userAddress, uint256 _balance)
        public
        pure
        returns (bytes memory)
    {
        return abi.encodePacked(_userAddress, _balance);
    }
}
