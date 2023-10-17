const API = 'https://sepolia.infura.io/v3/ApI_Key';
const { Web3 } = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(API));

const Template = "Found it ----------------------------------------->"
  
  async function findContractCreationTransaction(contractAddress) {
    const latestBlockNumber = 4499985;
    // const latestBlockNumber = await web3.eth.getBlockNumber();
    contractAddress = contractAddress.toLowerCase();
  
    console.log(`Starting block: ${latestBlockNumber}`);
  
    for (let i = latestBlockNumber; i >= 0; i--) {
      console.log(`Inspecting block ${i}`);
      const block = await web3.eth.getBlock(i, true);

      if (block && block.transactions?.length > 0) {
        block.transactions.forEach((tx, index) => {
            if(!tx.to){
                web3.eth.getTransactionReceipt(tx.hash).then((res) => {if(res.contractAddress.toLowerCase() === contractAddress.toLowerCase())console.log(Template+res.from);return tx;});
            }
        });
      }
    }
  
    return null;
  }
  
  async function main() {
    const contractAddress = "0x24Acc9E1A31266888c4f2c1c6d58F33bC3CAd8A8"; // Replace with your contract address
    console.log("Looking for contract creation...");
    const creationTransaction = await findContractCreationTransaction(contractAddress);
  
    if (creationTransaction) {
      console.log("Transaction Hash:", creationTransaction);
    } else {
      console.log("Contract creation transaction not found.");
    }
  }
  
  main().catch((error) => console.error(error));




//  https://api.etherscan.io/api?module=contract&action=getcontractcreation&contractaddresses=0x38124462Da2Bd50e9780f9deFAB645C35741b0ff&apikey=API_KEY