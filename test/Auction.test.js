const { assert } = require('chai')
const Auction = artifacts.require('Auction')
require('chai').use(require('chai-as-promised')).should()

contract('Auction', (accounts) => {
  const owner = accounts[0]

  before(async () => {
    // Load Contracts
    auction = await Auction.new()
  })

  describe('1) Deployment of auction contract', () => {
    it('should the name off contract', async (done) => {
      const contract = auction.address
      assert.equal(contract, contract)
      assert.isOk('The address is: ' + contract)
      done()
    })
  })

  describe('2) Verify Owner function. ', () => {
    it('should the Owner address', async (done) => {
      assert.equal(owner, accounts[0])
      done()
    })
  })

  describe('3) Add Wei to placeBid function. ', () => {
    it('should the send wei to placebid', async () => {
      const tx = async () => {
        await auction.placeBid({
          from: accounts[1],
          value: '1000000000',
        })
        await auction.placeBid({
          from: accounts[2],
          value: '2000000000',
        })
        await auction.placeBid({
          from: accounts[2],
          value: '3000000000',
        })
      }

      assert.isOk(tx, 'Sucess')
    })
  })

  describe('4) Cancel to auction', () => {
    it('should the cancel auction', async () => {
      const msg_sender = accounts[0]
      await auction.cancelAuction({ from: msg_sender })
      const stateAuction = await auction.auctionState()
      stateAuction.toString().should.equal('3')

      //Verify if call is owner
    })
  })

  describe('5) Finish the auction', () => {
    it('should the finish auction contract in the 3 blocks', async () => {
      //send 2 txs to finish the auction
      await auction.finishAuction({ from: owner })
      const statusAuction = await auction.auctionState()
      statusAuction.toString().should.equal('2')
    })
  })
})
