//SPDX-License-Identifier: Unlicense    

pragma solidity >=0.5.0 <0.9.0;

contract Auction{
    /** 
        @dev declare all state variables 
    */
    address payable public owner; 
    //declare time variables with start block and end block
    uint public startBlock;
    uint public endBlock;
    //declare string for IPFS Hash 
    string public ipfsHash;
    //List for States of running Auction
    enum State {Started, Running, Ended, Canceled}
    State public auctionState;
    //declare variable for the price and the highest bid
    uint public highestBindingBid;
    address payable public highestBidder;
    //declare state variable for the add address for peoples lauching the auction
    mapping(address => uint ) public bids;
    //declare state variable for increment peoples for lauching the auction.
    uint bidIncrement;

    string public _name = "Auction";


    constructor(){
        owner = payable(msg.sender);
        auctionState = State.Running;
        //calculate the blocktime: 
        /**@dev the block on Ethereum is updated every 15 secounds*/
        startBlock = block.number; 
        // 1 week = 60*60*24*7 = 604800 / 15(secounds) = 40,320 
        endBlock = startBlock + 40320;
        ipfsHash = "";
        //increment = 100 wei
        bidIncrement = 100;

    }

    //modifier for verift if msg.sender not owner
    modifier  notOwner() {
        require(msg.sender != owner); 
        _;
    }
    //modifier for verift if time is start
    modifier afterStart(){
        require(block.number >= startBlock);
        _;
    }
    //modifier for verift if time is end 
    modifier beforeEnd(){
        require(block.number <= endBlock);
        _;
    }

    //* function to calculate highest bid and lowest bid, 
    //* this functions is pure because not change the block (tx)
    function min(uint a, uint b) pure internal returns(uint){
        /**@dev if a < b return a value
           ->  if value = a this lance A is larger
           ->  if value = b this lance B is larger
         */
        if(a<=b){
            return a;
        }else{
            return b;
        }
    }

    function placeBid() public payable notOwner afterStart beforeEnd {
        require(auctionState == State.Running);
        require(msg.value >= 100); //min 100wei
        
        uint currentBid = bids[msg.sender] + msg.value; 
        require(currentBid > highestBindingBid);
        bids[msg.sender] = currentBid;

        if(currentBid <= highestBindingBid){
            highestBindingBid = min(currentBid + bidIncrement, bids[highestBidder]);   
        }else{
            highestBindingBid = min(currentBid, bids[highestBidder] + bidIncrement);
            highestBidder = payable(msg.sender);
        }
    }

 

}