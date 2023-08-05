const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const { Web3 } = require("web3");
const fs = require("fs");

const web3 = new Web3();

// Đọc dữ liệu từ tập tin list.txt
const data = fs.readFileSync("airdroplist.txt", "utf8");
const lines = data.split("\n");

const typesArray = ["address", "uint256"];
// Tạo mảng các leaf từ dữ liệu trong tập tin
const leaves = lines.map((line) => {
  const parametersArray = ([address, amount] = line.split(","));
  const encodedParams = web3.eth.abi
    .encodeParameters(typesArray, parametersArray)
    .replace(/^0x0+/, "0x"); //xóa các số 0 ở đầu hex sau khi hash
  const leaf = keccak256(encodedParams);
  return leaf;
});

// Tạo Merkle Tree từ mảng các leaf
const merkleTree = new MerkleTree(leaves, keccak256);

// Test thử tạo 1 proof
testleaf = web3.eth.abi
  .encodeParameters(typesArray, [web3.utils.toChecksumAddress("0xB6Cc53B34e3fb5A6F5d35cD7927351F7c90E2914"), 2000n])
  .replace(/^0x0+/, "0x"); //xóa các số 0 ở đầu hex sau khi hash
const proof = merkleTree.getHexProof(keccak256(testleaf));

// In thông tin Merkle Tree
console.log("Merkle Root:", merkleTree.getRoot().toString("hex"));
console.log(testleaf);
console.log(proof);
