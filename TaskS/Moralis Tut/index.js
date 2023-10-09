
import express from 'express';
import * as api from './Api/Api.js';

const app = express();
const port = 5001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));


// app.get("/", api.Welcome);

// Wallet API...
app.get("/walletactivitybychain",api.getWalletActivityByChain);
app.get('/nativebalance',api.getNativeBalance);
app.get('/nftonaddress',api.getNftOnAddress);
app.get('/getWalletTokenBalances',api.getWalletTokenBalances);
app.get('/getWalletTransactions',api.getWalletTransactions);
app.get('/getWalletTokenTransfers',api.getWalletTokenTransfers);

// NFT API.......
app.get("/nft-owned-cross-chain",api.getNFTAcrossChain);

// Token API.....
app.get("/getTokenMetadataBySymbol",api.getTokenMetadataBySymbol);
app.get("/getTokenPrice",api.getTokenPrice);
app.get("/getTokenBalance",api.getTokenBalance);

// Market Api
app.get('/getTokenByPriceChange',api.getTokenByPriceChange);
app.get('/getNFTByTradingVolume',api.getNFTByTradingVolume);

// BlockChain Api
app.get('/getContractLogs',api.getContractLogs);
app.get('/getContractEvents',api.getContractEvents);

// Swap Pairs
app.get('/getUniSwapPair',api.getUniswapPair);
app.get('/getUniSwapReserve',api.getUniswapReserve);
app.get('/getSushiSwapPair',api.getSushiSwapPair);
app.get('/getSushiSwapReserve',api.getSushiSwapReserve);



app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});