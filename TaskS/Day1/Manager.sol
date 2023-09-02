// SPDX-License-Identifier: UNLICENSE
pragma solidity ^0.8.0;

contract Manager{
    string role1 ;
    string role2 ;
    mapping (address => string) roles;
    address[] registered;
    
    constructor(string memory class1 , string memory class2){
        role1 = class1;
        role2 = class2;
    }

    function Register (string memory role)public {
        require(keccak256(bytes(role)) == keccak256(bytes(role1)) || keccak256(bytes(role)) == keccak256(bytes(role2)),"Roles must be valid.");
        require(!(keccak256(bytes(roles[msg.sender])) == keccak256(bytes(role1)) || keccak256(bytes(roles[msg.sender])) == keccak256(bytes(role2))),"Cannot change roles. Stay Tune for any updates.");
        roles[msg.sender]=role;
        registered.push(msg.sender);
    }

    function isRegistered() public view returns(bool){
        for(uint i=0;i<registered.length;i++){
            if(registered[i] == msg.sender)return true;
        }
        return false;
    }
    function isRegistered(address query) public view returns(bool){
        for(uint i=0;i<registered.length;i++){
            if(registered[i] == query)return true;
        }
        return false;
    }
    function checkRole() public view returns(string memory){
        require(isRegistered(),"You must be registered.");
        return roles[msg.sender];
    }
    function checkRole(address query) public view returns(string memory){
        require(isRegistered(query),"This Address is not registered.");
        return roles[query];
    }
}
// Constructor, Register, isRegistered , checkRole