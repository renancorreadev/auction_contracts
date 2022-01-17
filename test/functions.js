/**
 * @dev use these variables and functions below in truffles console to test the
 * functionality.
 */

//instance contract deployed
/**
 * const con = await Auction.deployed()

//get the state of the auction
const state = await con.auctionState()

//convert state to string
const stateAuction = state.toString()
 
//function to return state in string format.
function stateNow(){ if(stateAuction == 1){return 'Running'} else if(stateAuction == 2){return 'Ended'} else if(stateAuction == 3){return 'Canceled'}}

//Send ether to placebid function
con.placeBid({ from: accounts[1], value: '1000000000000000000' })
 
//Finished auction (ended)
await con.finishAuction({from : accounts[0]})
 */
