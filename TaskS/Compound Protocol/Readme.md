<!--Code for Compound -> https://medium.com/compound-finance/supplying-assets-to-the-compound-protocol-ec2cf5df5aa -->
<!-- API -> https://goerli.infura.io/v3/1d0280e3483a407d9a95a75e6a38639b -->
<!-- Text For Account Gen for similar add -> "clutch captain shoe salt awake harvest setup primary inmate ugly among become" -->

## Steps to run
### Steps to run Invest Function :
  1. To run deploy on Testnets or Use forking : <br>
    ganache-cli --fork INFURA_API_KEY -m Address_Generator(optional)

  2. Add Contract Add of USDT, Compound, and NFT Contract addresses
  3. To transfer USDT on forked network run:<br>
    node ganacheCLITTokenTransfer.js
  4. Approve our Compound Contract to Transfer USDT from user's address run : <br>
    node ganache-cliApprove.js

#### Investment done....

4. Approve NFT Transfer -> node ganacheCLIToken.js

### Steps to run Divest Function 


# Compound Protocol Task

## Introduction:
	Design and Implement a contract that implements the Compound Protocol where users can lend their USDT and in return they get a NFT. 
The contract then invests the money provided by the user to compound protocol to earn interest.
When a user withdraws their money the NFT is burned and the principal amount is credited back to the user and the interest i.e the reward from the compound protocol is credited to the admin.


#### My Work :
#### Compound Protocol.sol:
The Contract that handles the logic for interaction and management of the user assets.

#### Invest Function :
It takes specified amount of USDT from user’s account,
Mint NFT to the user's address.
Approves the Compound Contract to transfer the amount on MINT.
Then mints the amount on the Compound Contract.
Stores the transaction specifics to Data Structure for use later.

#### Divest Function : 
It takes input of the id of the transaction.
Redeems the cToken generated for the specified transaction.
Calculates the reward and Principal amount.
Transfers the principal amount to the user’s address and Reward to the admin.

#### Data Structure: 
      This is a mapping of the user's address with an array of transaction objects.
Each transaction specifies the id of the minted nft, the amount lended in the transaction, and the respective cToken generated.

ComoundNFT.sol
This is the contract that is used to mint the NFT.
It is an ERC721 token with all fundamental functions with their respective usage.

Some extra files:
These are the files that are used to approve or transfer funds using web3 on a forked network to test the contract.

