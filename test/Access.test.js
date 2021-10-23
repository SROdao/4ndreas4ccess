const { assert } = require('chai');

const Access = artifacts.require('./Access.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Access', (accounts) => {
    let contract;

    before(async () => {
        contract = await Access.deployed()
    })

    //test cases for 4ccess contract here
    describe(`deployment`, async () => {
        //smoke test
        //check the address to make sure it got deployed on the network
        it(`deploys successfully`, async () => {
            const address = contract.address;

            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it(`has a name`, async () => {
            const name = await contract.name()
            assert.equal(name, '4ccess')
        })

        it(`has a symbol`, async () => {
            const symbol = await contract.symbol()
            assert.equal(symbol, '4CCESS')
        })
    })
})