// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";


contract HSToken is ERC20("HSToken","HST"), Ownable(msg.sender) {
    function mintfifty() public onlyOwner {
        _mint(msg.sender,50*10**18);
    }
    address public contractAdd = address(this);


}
