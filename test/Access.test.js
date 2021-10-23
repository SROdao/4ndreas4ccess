const Access = artifacts.require('./Access.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Access', (accounts) => {
    //test cases for 4ccess contract here
    describe('deployment', async () => {
        //smoke test
        //check the address to make sure it got deployed on the network
        it('deploys successfully', async() => {
            
        })
    })
})