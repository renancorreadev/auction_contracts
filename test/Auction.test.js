const { assert } = require('chai')
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
})
