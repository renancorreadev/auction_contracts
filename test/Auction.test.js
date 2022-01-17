const { assert, expect } = require('chai')
const Auction = artifacts.require('Auction')
require('chai').use(require('chai-as-promised')).should()

contract('Auction', (accounts) => {
  const owner = accounts[0]

  before(async () => {
    // Load Contracts
    auction = await Auction.new()
  })

  describe('Deployment of Auction', () => {
    it('should the name off contract', async () => {
      const contract = auction.address
      assert.equal(contract, contract)
      assert.isOk('The address is: ' + contract)
    })
  })

  describe('Verify Owner function. ', () => {
    it('should the Owner address', async () => {
      assert.equal(owner, accounts[0])
    })
  })

  describe('Add Wei to PlaceBid function. ', () => {
    it('should check if msg.sender notOwner', async () => {
      const call_address = accounts[1]
      const tx = await auction.placeBid({
        from: call_address,
        value: '500',
      })
      assert.isOk(tx, 'Sucess the call Address not Owner')
    })

    it('should the send wei to placebid', async () => {
      const tx = await auction.placeBid({
        from: accounts[1],
        value: '1000000000',
      })
      assert.isOk(tx, 'Sucess')
    })
  })

  describe('Cancel to Auction', () => {
    it('should the cancel auction', async () => {
      const msg_sender = accounts[0]
      await auction.cancelAuction({ from: msg_sender })
      const stateAuction = await auction.auctionState()
      stateAuction.toString().should.equal('3')
      //Verify if call is owner
    })
  })
})
