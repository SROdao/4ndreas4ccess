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

    describe(`minting`, async () => {
        it(`creates a new token when tokenId is unique`, async () => {
            const result = await contract.mint(1)

            const totalSupply = await contract.totalSupply()
            const event = result.logs[0].args
            
            assert.equal(totalSupply, 1)
            assert.equal(event.tokenId.toNumber(), 1, 'ID is correct')
            assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'FROM is correct')
            assert.equal(event.to, accounts[0], 'TO is correct') //accounts are passed in by Ganache

            // FAILURE: cannot mint same ID twice
            await contract.mint(1).should.be.rejected;
        })
    })

    describe(`indexing`, async () => {
        it(`lists ids`, async () => {
            //Mint 3 tokens
            await contract.mint(2)
            await contract.mint(3)
            await contract.mint(4)
            
            const totalSupply = await contract.totalSupply()

            const result = []
            for(let i=0; i<=totalSupply-1; i++) {
                const id = await contract.ids(i)
                result.push(id)
            }
            
            let expected = [1, 2, 3, 4]
            assert.equal(result.join(','), expected.join(','))
        })
    })
})