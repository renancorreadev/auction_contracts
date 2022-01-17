<h1>Auction smart contract</h1>

<p>Smart contract for a decentralized auction like an eBay</hp>

- The Auction has an owner (the person selling a good or service), a beginning and an end meeting;

- The owner can cancel the auction if there is an emergency or can end the auction after its end time:

- People are sending ETH by calling a function called placeBid(. The sender's address and the amount sent to the auction will be stored in the mapping variable called bids;

- Users are encouraged to bid as much as they are willing to pay, but not for that total amount, but for the previous highest bid plus an increment. The contract will automatically bid up to a certain amount;

- The highestBindingBid is the selling price and the highest bidder is the person who worked the auction;

- After the auction ends, the owner gets the biggestBindingBid and everyone else takes their own value.

### Function PlaceBid logic

<p style="text-align: center">
bids[0x123] = 40
bids[0xabc] = 70
bidIncrement = 40
highestBidder = 0xabc...
highestBindingBid = 50.
</p>
<br/>

```solidity
    function placeBid() external payable notOwner afterStart beforeEnd {
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
```

<br/>

<h3> Withdrawal function logic </h3>

<p>
 -> We do not proactively return funds to users who have not won the auction. Well use the "withdrawal pattern"" instead.

-> We should only send ETH to a user when he explicitly requests it.

-> This is the "withdrawal" pattern and helps us avoid re-entry attacks that could
cause unexpected behavior, including catastrophic financial loss to users;

-> We should only send ETH to a user when he explicitly requests it.
This is the "withdrawal" pattern and helps us avoid re-entry attacks that could
cause unexpected behavior, including catastrophic financial loss to users;

</p>
<br/>

```solidity
     function finishAuction() public {
        require(auctionState == State.Canceled || block.number > endBlock, "The auction has not finished!");
        require(msg.sender == owner || bids[msg.sender] > 0, "You have already withdrawn your funds or you not is owner!");

        address payable recipient;
        uint value;
        if(auctionState == State.Canceled){ //auction was canceled
            recipient = payable(msg.sender);
            /**@dev the bids[] is mapping value was deposit. */
            value = bids[msg.sender];
        }else{ //auction not canceled
            if(msg.sender == owner){
                recipient = owner;
                value = highestBindingBid;
            }else{ //this is a bidder
               if(msg.sender == highestBidder){
                   recipient = highestBidder;
                   value = bids[highestBidder] - highestBindingBid;
               }else{ // this is neither the owner nor the highestBidder
                    recipient = payable(msg.sender);
                    value = bids[msg.sender];
               }
            }
        }
        bids[recipient] = 0;
        recipient.transfer(value);
        auctionState = State.Ended;
        emit EndAuction();
    }
```

<h3>Scalability </h3>
<br />
<p>
The purpose of this protocol is for each person to create their own contract and manage their auction, for this we use the scalability technique where a contract creates other contracts stored in an array.
</p>
<br />

```solidity
//SPDX-License-Identifier: Unlicense

pragma solidity >=0.5.0 <0.9.0;

contract A{
    address public ownerA;
    constructor(address eoa){
        ownerA = eoa;
    }
}

contract Creator{
    address public ownerCreator;
    A[] public deployedA;

    constructor() {
        ownerCreator = msg.sender;
    }

    function deployA() public {
        A new_A_address = new A(msg.sender);
        deployedA.push(new_A_address);
    }
}

```

<br/>

<h3>Tests.</h3> 
<br/>
<p>All tests were written in Chai with javascript and are ok.</p>
<br/>

<p>
<img src="https://github.com/skyxcripto/Contract_Leilao/blob/master/doc/test%20ok.png" alt="testprint">
</p>

<br/>

<h3> Execute in  Ganache Localhost </h3>

### 1) Configure Ganache local para: http://127.0.0.1:8545

```json
 truffle compile
```

### 2) Migre o projeto para Ganache:

```json
 truffle migrate --reset
```

### 3) Teste o contrato:

```json
 truffle test
```

## Contact

skyxcripto - [Github](https://github.com/skyxcripto) - **producer@skynance.net**
