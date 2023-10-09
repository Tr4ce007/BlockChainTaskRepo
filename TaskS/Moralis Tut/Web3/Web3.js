import Moralis from "moralis";
// Import the EvmChain dataType
import { EvmChain } from "@moralisweb3/common-evm-utils";

// Add a variable for the api key, address and chain
const MORALIS_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjI0OTJmNjQyLWYzNjAtNGQ4NS05ZTNiLTNjODg5ZmEzZTA4NSIsIm9yZ0lkIjoiMzYwMTc3IiwidXNlcklkIjoiMzcwMTY2IiwidHlwZUlkIjoiNTJlZjI2YWQtMmYzYy00NjUyLTg2ZWMtZGJkZjJkMGRkYzc0IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2OTY2NzE5NDgsImV4cCI6NDg1MjQzMTk0OH0.RhGegiorSbvx7NBRPSGxmFZXfWSZDfq4jtJd1xeKcxY";

// Add this a startServer function that initialises Moralis
const startServer = async () => {
  await Moralis.start({
    apiKey: MORALIS_API_KEY,
  });
};
// Call startServer()
startServer();


/********************************************************         Wallet Api              ******************************************* */


// Function to get Wallet Activity on various chains....
export const getWalletChainActivity = async (address, chains) => {
    // const address = '0xd8da6bf26964af9d7eed9e03e53415d37aa96045';
    // const address = '0x9de2E0Cb2DDEEa396092A3E5ab6Ff9af5976e631';    
    // const chains = [EvmChain.ETHEREUM, EvmChain.POLYGON, EvmChain.BSC];

    return  await Moralis.EvmApi.wallets.getWalletActiveChains({
        address,
        chains,
    });
}

// Function to get Native Balance
export const getNativeBalanceOf = async (address , chain) => {

    // const address = '0xd8da6bf26964af9d7eed9e03e53415d37aa96045';
    // const chain = EvmChain.ETHEREUM;

    return await Moralis.EvmApi.balance.getNativeBalance({
        address,
        chain,
    });
}

// Function to get All NFT on Address 
export const nftOnAddress = async (address, chain) => {
    return await Moralis.EvmApi.nft.getWalletNFTs({
        address,
        chain,
    });
}

// Function to get All Tokens by Address 
export const getTokenBalance = async (address) => {
    const chain = EvmChain.ETHEREUM;

    return await Moralis.EvmApi.token.getWalletTokenBalances({
        address,
        chain,
    });
}

// Function to get All Transaction on Wallet
export const getTransactions = async (address) => {
    const chain = EvmChain.ETHEREUM;

    return await Moralis.EvmApi.transaction.getWalletTransactions({
        address,
        chain,
    });
}

// Function to get All ERC20 Tokens Transfers
export const getAllTokenTransfers = async (address) => {
    const chain = EvmChain.ETHEREUM;

    return await Moralis.EvmApi.token.getWalletTokenTransfers({
        address,
        chain,
    });
}

/*****************************          NFT Api                     *************** */

export const NFTAcrossChain = async (address) => {
    const chains = [EvmChain.ETHEREUM, EvmChain.BSC, EvmChain.POLYGON];
    const allNFTs = [];
    for (const chain of chains) {
        const response = await Moralis.EvmApi.nft.getWalletNFTs({
            address,
            chain,
        });
        allNFTs.push(response);
    }
    return allNFTs;
}

/****************************                 Token Api             ***************** */

// Function to get Metadata of ERC20 by Symbol
export const getERCMetaData = async (symbols) => {
    const chain = EvmChain.ETHEREUM;

    return await Moralis.EvmApi.token.getTokenMetadataBySymbol({
        symbols,
        chain,
    });
}

// Function to get ErcToken Price
export const getERCTokenPrice = async (address) => {
    const chain = EvmChain.ETHEREUM;
    return await Moralis.EvmApi.token.getTokenPrice({
        address,
        chain,
    });
}

// Function to get ErcToken Balance 
export const getErcBalance = async (address) => {
    const chain = EvmChain.ETHEREUM;
    return await Moralis.EvmApi.token.getWalletTokenBalances({
        address,
        chain,
    });
}


/*****************************          Market Api                     *************** */

// Function to top ERC tokens by Price Change
export const getErcByPriceChange = async () => {
    const response = await Moralis.EvmApi.marketData.getTopERC20TokensByPriceMovers();
    console.log(response);
    console.log(response.raw);
    return response.raw;
}
// function to get Top NFT by Trading Volume
export const getNFTByTradeVolume = async () => {
    const response =
    await Moralis.EvmApi.marketData.getHottestNFTCollectionsByTradingVolume();
    console.log(response);
    console.log(response.raw);
    return response.raw;
}

/*****************************          BlockChain Api                     *************** */

// Function to get Get Logs for Contract
export const getLogsOfContract = async (address,topic0) => {
    const chain = EvmChain.ETHEREUM;

    const response = await Moralis.EvmApi.events.getContractLogs({
        address,
        chain,
        topic0,
    });
    return response.toJSON();
}

// Function to get Get events for Contract
export const getEventsOfContract = async (address,topic,abi) => {
    const chain = EvmChain.ETHEREUM;

    const response = await Moralis.EvmApi.events.getContractEvents({
        address,
        chain,
        topic,
        abi,
    });
    return response;
}

/********************************************************         Pair and Liquidity              ******************************************* */

//
export const UniswapPair = async (token0Address,token1Address) => {
    const chain = EvmChain.ETHEREUM;
    const response = await Moralis.EvmApi.defi.getPairAddress({
        token0Address,
        token1Address,
        chain,
    });
    return response;
}

//
export const UniswapReserve = async (pairAddress) => {
    const chain = EvmChain.ETHEREUM;

    const response = await Moralis.EvmApi.defi.getPairReserves({
        pairAddress,
        chain,
    });
    return response;
}

//
export const SushiSwapPair = async (token0Address,token1Address) => {
    const chain = EvmChain.ETHEREUM;

    const response = await Moralis.EvmApi.defi.getPairAddress({
        token0Address,
        token1Address,
        chain,
        exchange: "sushiswapv2",
    });
    return response;
}

//
export const SushiSwapReserve = async (pairAddress) => {
    const chain = EvmChain.ETHEREUM;

    const response = await Moralis.EvmApi.defi.getPairReserves({
        pairAddress,
        chain,
    });
    return response;
}