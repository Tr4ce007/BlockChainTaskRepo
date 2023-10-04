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

### Steps to run Divest Function :
