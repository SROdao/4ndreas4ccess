import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import artwork1 from '../artworks/artwork1.png';
import artwork2 from '../artworks/artwork2.png';
import artwork3 from '../artworks/artwork1.png';
import artwork4 from '../artworks/artwork4.png';
import artwork5 from '../artworks/artwork5.png';
import artwork6 from '../artworks/artwork6.png';
import artwork7 from '../artworks/artwork7.png';
import './App.css';
import Access from '../abis/Access.json'

function App() {

    const [account, setAccount] = useState("")
    const [contract, setContract] = useState(null)
    const [totalSupply, setTotalSupply] = useState(0)
    const [artworks, setArtworks] = useState([artwork1, artwork2, artwork3, artwork4, artwork5, artwork6, artwork7])
    const [artwork, setArtwork] = useState(null)

    useEffect(() => {
        loadWeb3()
        loadBlockchainData()
        setRandomArtwork()
    }, []);

    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    const loadBlockchainData = async () => {
        const web3 = window.web3
        //Load Account
        const accounts = await web3.eth.getAccounts()
        setAccount(accounts[0])

        const networkId = await web3.eth.net.getId()
        const networkData = Access.networks[networkId]
        if (networkData) {
            const abi = Access.abi
            const address = networkData.address
            const contract = new web3.eth.Contract(abi, address)
            setContract(contract)
            const totalSupply = await contract.methods.totalSupply().call()
            setTotalSupply(totalSupply)
            // for (let i = 0; i <= totalSupply - 1; i++) {
            //   const id = await contract.methods.ids(i).call()
            //   this.setState({
            //     ids: [...this.state.ids, id]
            //   })
            // }
        } else {
            window.alert('Smart contract not deployed to detected network.')
        }
    }

    const mint = () => {
        contract.methods.mint().send({ from: account })
        // .once('receipt', (receipt) => {})
    }

    const setRandomArtwork = () => {
        const randomIndex = Math.floor(Math.random() * artworks.length)
        const randomArtwork = artworks[randomIndex]
        setArtwork(randomArtwork)
    }

    return (
        <div>
          <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <a
              className="navbar-brand col-sm-3 col-md-2 mr-0"
              href="https://twitter.com/_4ndreas"
              target="_blank"
              rel="noopener noreferrer"
            >
              4ndreas 4ccess
            </a>
            <ul className="navbar-nav px-3">
              <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                <small className="text-white"><span id="account">{account}</span></small>
              </li>
            </ul>
          </nav>
          <div className="container-fluid justify-content-center mt-5">
            <div className="row">
              <main role="main" className="col-lg-12 d-flex text-center">
                <div className="content mr-auto ml-auto">
                    <img src={artwork} onClick={setRandomArtwork} className="App-logo" alt="4ccess" />
                  <h1>Mint 4ccess for Exclusive Content</h1>
                </div>
              </main>
            </div>
            <div className="row">
              <main role="main" className="col-lg-12 d-flex text-center">
                <div className="content mr-auto ml-auto p-5">
                  <h3>{444 - Number(totalSupply) + "/444"}</h3>
                  <button onClick={mint}>MINT</button>
                </div>
              </main>
            </div>
          </div>
        </div>
      );
}

export default App;