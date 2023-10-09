import * as api from '../Web3/Web3.js';


// Landing Page.....
export const Welcome = (req,res) => {
    try {
        res.send("Welcome to Moralis Tutorial");
    } catch (error) {
        console.log(error);        
    }
}

/********************************************************         Wallet Api              ******************************************* */

// Api to get Wallet Activoty on various chains....
export const getWalletActivityByChain = async (req,res) => {
    try {
        const address = req.query.add;
        const chains = req.body.chain;
        res.status(200);
        // const result = await api.getWalletChainActivity(address,chains);
        api.getWalletChainActivity(address,chains).then((result) =>{
            if (result && result.active_chains) {
                    result.active_chains.forEach((chain) => {
                      chain.chain_id = hexToInteger(chain.chain_id); 
                    });
                  } else {
                    console.error("No active_chains data found in the result.");
                  }
            res.send(result);
        })
        // if (result && result.active_chains) {
        //     result.active_chains.forEach((chain) => {
        //       chain.chain_id = hexToInteger(chain.chain_id); 
        //     });
        //   } else {
        //     console.error("No active_chains data found in the result.");
        //   }
        // res.send(result);
    } catch (error) {
        console.log(error);
        res.status(400);
        res.send("Something went wrong.");
    }
}

// Api to get Native Balance of a Address..
export const getNativeBalance = async (req,res) => {
    try {
        const address = req.query.add;
        const chains = req.body.chain;
        res.status(200);
        res.send( await api.getNativeBalanceOf(address, chains));
    } catch (error) {
        console.log(error);  
        res.status(400);   
        res.send("Something went wrong.");  
    }
}

// Api to get All NFTs owned by the Address
export const getNftOnAddress = async (req,res) => {
    try {
        const address = req.query.add;
        const chains = req.body.chain;
        res.status(200);
        res.send(await api.nftOnAddress(address, chains));
    } catch (error) {
        console.log(error); 
        res.status(400); 
        res.send("Something went wrong.");    
    }
}

// Get Token Balance by Address
export const getWalletTokenBalances = async (req,res ) => {
    try {
        const address = req.query.add;
        res.status(200);
        res.send(await api.getTokenBalance(address));
    } catch (error) {
        console.log(error);
        res.status(400);
        res.send("Something went wrong.");
    }
}

// Get All Transaction Activity
export const getWalletTransactions = async (req,res) => {
    try {
        const address = req.query.add;
        res.status(200);
        res.send(await api.getTransactions(address));
    } catch (error) {
        console.log(error);
        res.status(400);
        res.send("Something went wrong.");
    }
}

// Get All ERC20 Transfers
export const getWalletTokenTransfers = async (req,res) => {
    try {
        const address = req.query.add;
        res.status(200);
        res.send(await api.getAllTokenTransfers(address));
    } catch (error) {
       console.log(error); 
       res.status(400);
       res.send("Something went wrong.");
    }
}
/********************************************************         NFT Api              ******************************************* */

export const getNFTAcrossChain = async (req,res) => {
    try {
        const address = req.query.add;
        res.status(200);
        res.send(await api.NFTAcrossChain(address));
    } catch (error) {
        console.log(error);
        res.status(400);
        res.send("Something went wrong.");
    }
}

/********************************************************         Token Api              ******************************************* */


// Get ERC20 Metadata by symbol
export const getTokenMetadataBySymbol  = async (req,res) => {
    try {
        const symbol = req.body.sym;
        res.status(200);
        res.send(await api.getERCMetaData(symbol));
    } catch (error) {
        console.log(error);
        res.status(400);
        res.send("Something went wrong.");
    }
}

// Function to get Token Price
export const getTokenPrice = async (req,res) => {
    try {
        const address = req.body.add;
        res.status(200);
        res.send(await api.getERCTokenPrice(address));
    } catch (error) {
        console.log(error);
        res.status(400);
        res.send("Something went wrong.");
    }
}

// Function to get Token Balnce
export const getTokenBalance = async (req,res) => {
    try {
        const address = req.query.add;
        res.status(200);
        res.send(await api.getErcBalance(address));
    } catch (error) {
        console.log(error);
        res.status(400);
        res.send("Something went wrong.");
    }
}


/********************************************************         Market Api              ******************************************* */

export const getTokenByPriceChange = async (req,res) => {
    try {
        res.status(200);
        res.send(await api.getErcByPriceChange());
    } catch (error) {
        console.log(error);
        res.status(400);
        res.send("Something went wrong.");
    }
}

// NFT By Volume Trade
export const getNFTByTradingVolume = async (req,res) => {
    try {
        res.status(200);
        res.send(await api.getNFTByTradeVolume());
    } catch (error) {
        console.log(error);
        res.status(400);
        res.send("Something went wrong.");
    }
}


/********************************************************         Blockchain Api              ******************************************* */

// Get Logs of Contract
export const getContractLogs = async (req,res) => {
    try {
        const address = req.query.add;
        const topic = req.query.topic;
        res.status(200);
        res.send(await api.getLogsOfContract(address,topic));
    } catch (error) {
        console.log(error);
        res.status(400);
        res.send("Something went wrong.");
    }
}

// Get Events of Contract
export const getContractEvents = async (req,res) => {
    try {
        const address = req.query.add;
        const topic = req.query.topic;
        const abi = req.body.abi;
        res.status(200);
        res.send(await api.getEventsOfContract(address,topic,abi));
    } catch (error) {
        console.log(error);
        res.status(400);
        res.send("Something went wrong.");
    }
}
/********************************************************         Pair and Liquidity              ******************************************* */

//
export const getUniswapPair = async (req,res) => {
    try {
        const token1 = req.query.t1;
        const token2 = req.query.t2;
        res.status(200);
        res.send(await api.UniswapPair(token1,token2));
    } catch (error) {
        console.log(error);
        res.status(400);
        res.send("Something went wrong.");
    }
}

//
export const getUniswapReserve = async (req,res) => {
    try {
        const address = req.query.add;
        res.status(200);
        res.send(await api.UniswapReserve(address));
    } catch (error) {
        console.log(error);
        res.status(400);
        res.send("Something went wrong.");
    }
}

//
export const getSushiSwapPair = async (req,res) => {
    try {
        const tok1 = req.query.t1;
        const tok2 = req.query.t2;
        res.status(200);
        res.send(await api.SushiSwapPair(tok1,tok2));
    } catch (error) {
        console.log(error);
        res.status(400);
        res.send("Error");
    }
}

//
export const getSushiSwapReserve = async (req,res) => {
    try {
        const address = req.query.add;
        res.status(200);
        res.send(await api.SushiSwapReserve(address));
    } catch (error) {
        console.log(error);
        res.status(400);
        res.send("Error");
    }
}