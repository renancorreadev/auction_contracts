/**
 * @dev use these variables and functions below in truffles console to test the
 * functionality.
 */

//instance contract deployed
/**
const con = await Auction.deployed()

//get state 
var state = await con.auctionState()
var state_ = state.toString()

//function to return state in string
 
 
//Send ether to placebid function
con.placeBid({ from: accounts[1], value: '1000000000000000000' })
 
//Finished auction (ended)
await con.finishAuction({from : accounts[1]})

//cancel auction (canceled)
await con.cancelAuction({from : accounts[0]})
 */
const stateNow = () => {
  if (state_ == 1) {
    return 'Running'
  } else if (state_ == 2) {
    return 'Ended'
  } else if (state_ == 3) {
    return 'Canceled'
  }
}
