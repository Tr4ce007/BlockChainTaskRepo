// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFT is ERC721URIStorage, Ownable{
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds; 

    constructor() ERC721("Raven NFT","RNT"){}

    function minNFT(address reciepient, string memory tokenURI) public  onlyOwner returns(uint256){
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(reciepient,newItemId);
        _setTokenURI(newItemId,tokenURI);
        return newItemId;
    }
    
}

// My contract address -- of deployed 0x3e92374C2383B74738b4D32770612dDc1d080Bf3
// 0x7f4B10fef1Ef466E5271ec8f55ad811B6aAc9eb2
// 0x9de2E0Cb2DDEEa396092A3E5ab6Ff9af5976e631 meta mask
// NFT Marketplace https://testnets.opensea.io/assets?search[query]=0x3e92374C2383B74738b4D32770612dDc1d080Bf3
