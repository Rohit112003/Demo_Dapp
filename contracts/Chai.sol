//SPDX-License-Identifier: Gpl-3.0
pragma solidity 0.8.19;

contract Chai{
    struct Memo{
        uint timestamp;
        address  from;
        string message;
        string name;
        
    }

    Memo[] memos;
    address payable owner;
    constructor(){
        owner = payable(msg.sender);
    }

    function buyChai(string memory _name, string memory _message) public payable{
        require(msg.value>0, "pay more than 0");
        owner.transfer(msg.value);

        memos.push(Memo(block.timestamp, msg.sender, _message,_name));


    }
    function  getMemos()public view returns(Memo[] memory){
        return memos;
    }
}