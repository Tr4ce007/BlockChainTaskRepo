const ethers = require('ethers');

const Utils = require('./utils.js');
require('dotenv').config();


// Infura WebSocket URL for the Polygon mainnet
const infuraWsUrl = process.env.API; // Replace with your Infura Project ID

// Replace with your contract's ABI and address
const contractABI = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }], "name": "Register", "type": "event" }, { "inputs": [], "name": "getRegisteredUsers", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "register", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
const contractAddress = '0x4bcf2155b09D0824Fc513cD669Eb76bE234998DA';

// Initialize an Ethereum provider with the Infura WebSocket URL
const provider = new ethers.WebSocketProvider(infuraWsUrl);

// Initialize a contract instance
const contract = new ethers.Contract(contractAddress, contractABI, provider);

// Specify the event name to subscribe to
const eventName = 'Register';

// Subscribe to the event
contract.on(eventName, (userAddress) => {
  console.log(`New user registered: ${userAddress}`);
  Utils.sendMailAlert(userAddress);
});

console.log('Listening for Registration events...');

// Handle errors
provider.on('error', (error) => {
  console.error(`WebSocket Provider Error: ${error}`);
});





