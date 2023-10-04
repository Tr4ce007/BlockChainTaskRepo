// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

interface CompoundContract {  
    // function count() external view returns (uint);
    function mint(uint amt) external;
    function redeem(uint redeemTokens) external returns (uint);
    // function allowance(address owner, address spender) external view returns (uint);
    function balanceOf(address owner) external view returns (uint);
    // function approve(address spender, uint256 amount) external returns (bool);
    function borrowRatePerBlock() external view returns (uint);
    function exchangeRateStored() external view returns (uint256);
}

interface IUSDT {
    function totalSupply() external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    function balanceOf(address who) external view returns (uint256);    
    function transferFrom(address src, address dst, uint256 amount)   external returns (bool);
    function approve(address _spender, uint256 amount) external returns (bool);
    function transfer(address to , uint amt) external returns(bool);
}


interface NFTContract{
    function mint(address add) external ;
    function burn(uint256 tokenId)  external ;
    function totalSupply() external view returns (uint);
    function transferFrom(address from,address to, uint id) external  returns(bool);
}




contract CompoundProtocol{
    constructor(){
        _owner = msg.sender;
    }
    address NFTContractAddress = 0xF5c2E80b1868f77F1e50AFBc31766f06014d6668; // Stripes Nft
    NFTContract private CNFT = NFTContract(NFTContractAddress);
    address IUSDTADDRESS =  0x79C950C7446B234a6Ad53B908fBF342b01c4d446;
    IUSDT usdtToken = IUSDT(IUSDTADDRESS);
    address CAdd = 0x5A74332C881Ea4844CcbD8458e0B6a9B04ddb716;
    CompoundContract CContract = CompoundContract(CAdd);

    address _owner ;

    struct Detail{
        uint nftId;
        uint amount;
        uint cToken;
    }

    mapping (address => Detail[]) Data;

    function Invest(uint amt) public {
        require(amt > 0, "Amount must be greater than 0");
        address caller = msg.sender;
        uint tokenid = CNFT.totalSupply()+1;
        uint tokenToWithdraw = getCBal(address(this));        

        // Run approve for the contract before this .......
        require(usdtToken.transferFrom(caller, address(this), amt), "USDT transfer failed");
        require(usdtToken.approve(CAdd, amt), "Approval failed");

        // Mint amt
        CContract.mint(amt);

        // Mint nft to investers address
        CNFT.mint(caller);

        tokenToWithdraw = getCBal(address(this)) - tokenToWithdraw; //Diff in prev and curr bal
        Data[msg.sender].push(Detail(tokenid ,amt,tokenToWithdraw));
    }

    function Divest(uint id) public {
        require(Data[msg.sender].length > 0,"You haven't invested.");
        uint n = Data[msg.sender].length;
        uint txAmt;
        uint txCToken;
        uint nid;
        // Deleting history......
        for(uint i=0;i<n;i++){
            if(Data[msg.sender][i].nftId == id){
                txAmt = Data[msg.sender][i].amount;
                txCToken = Data[msg.sender][i].cToken;
                nid = Data[msg.sender][i].nftId;
                if(i==n-1)Data[msg.sender].pop();
                else {
                    Data[msg.sender][i]=Data[msg.sender][n-1];
                    Data[msg.sender].pop();                
                }
            }
        }
        address reedemer = msg.sender;
        // Approve Contract to transfer the nftId to its account and then burn it
        require(CNFT.transferFrom(reedemer,address(this),id),"Failed to get nft.");
        CNFT.burn(nid);

        uint pBal = usdtBal(address(this));
        CContract.redeem(txCToken);                                                                         
        uint IncAmt = usdtBal(address(this)) - pBal;
        uint reward = IncAmt - txAmt;
        
        usdtToken.transfer(reedemer,txAmt);  // Sending the amount back to user
        usdtToken.transfer(_owner, reward);   // Sending reward to owner
    }

    function pay() payable public {
    }

    function getYourDetail() public  view returns(Detail[] memory){
        Detail[] memory res = Data[msg.sender];
        return res;
    }


    // Function for Compound Contract . *****************************>>>>>>>>>>>>>>>>>>>>>>>>>>>

    function getCRate() public view  returns(uint){
        return CContract.borrowRatePerBlock();
    }

    function getCBal(address add) public view  returns(uint){
        return CContract.balanceOf(add);
    }

    function stakeCUSDT(uint amt) public {
        require(amt > 0, "Amount must be greater than 0");
        require(usdtToken.approve(CAdd, amt), "Approval failed");
        CContract.mint(amt);
    }
    function stakeOut(uint amt) public {
        CContract.redeem(amt);
    }

    // Function for USDT Contract  *******************************>>>>>>>>>>>>>>>>>>>>>>>>>>>

    function usdtTotalSupply() public view  returns(uint){
        return usdtToken.totalSupply();
    }

    function usdtBal(address add) public view returns(uint){
       return usdtToken.balanceOf(add);
    }

    function usdtAllowance(address owner, address spender) public view returns(uint){
        return usdtToken.allowance(owner, spender);
    }

    function usdtApprove(address to,uint amt) public returns(bool){
        return usdtToken.approve(to, amt);
    }

    function usdtTransFer() public {
        usdtToken.transferFrom(0xA7A93fd0a276fc1C0197a5B5623eD117786eeD06,address(this),500);
        usdtToken.transferFrom(0xA7A93fd0a276fc1C0197a5B5623eD117786eeD06,0x833c11b0dFaA548b37F914F9f064EFC4aa7B6bA4,500);
    }
}

// ganache-cli --fork https://goerli.infura.io/v3/1d0280e3483a407d9a95a75e6a38639b --unlock 0x2F62CEACb04eAbF8Fc53C195C5916DDDfa4BED02
// ganache-cli --fork https://mainnet.infura.io/v3/1d0280e3483a407d9a95a75e6a38639b --unlock 0xA7A93fd0a276fc1C0197a5B5623eD117786eeD06
// ganache-cli --fork https://goerli.infura.io/v3/1d0280e3483a407d9a95a75e6a38639b -m "clutch captain shoe salt awake harvest setup primary inmate ugly among become"
// goerli cEth ->  0x64078a6189Bf45f80091c6Ff2fCEe1B15Ac8dbde
// goerli cUSDT -> 0x5A74332C881Ea4844CcbD8458e0B6a9B04ddb716
// mainnetEth cUSDT -> 0xf650C3d88D12dB855b8bf7D11Be6C55A4e07dCC9
// Mainnet USDT -> 0xdAC17F958D2ee523a2206206994597C13D831ec7
// Goerli USDT ->  0x79C950C7446B234a6Ad53B908fBF342b01c4d446

