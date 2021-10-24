import React, { Component } from 'react';
import Web3 from 'web3';
import logo from '../logo.png';
import './App.css';
import Access from '../abis/Access.json'

class App extends Component {

  async componentWillMount() { //gets loaded if attached to the DOM successfully
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  // TODO: replace deprecated window.ethereum.enable() method
  // if (window.ethereum) {
  //   try {
  //     const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  //     setAccounts(accounts);
  //   } catch (error) {
  //     if (error.code === 4001) {
  //       // User rejected request
  //     }
  
  //     setError(error);
  //   }
  // }

  async loadBlockchainData() {
    const web3 = window.web3
    //Load Account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()
    const networkData = Access.networks[networkId]
    if (networkData) {
      const abi = Access.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      this.setState({ contract })
      const totalSupply = await contract.methods.totalSupply().call()
      this.setState({ totalSupply })
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

  mint = () => {
    this.state.contract.methods.mint().send({ from: this.state.account })
      // .once('receipt', (receipt) => {})
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contract: null,
      totalSupply: 0,
      // ids: [],
    }
  }

  render() {
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
              <small className="text-white"><span id="account">{this.state.account}</span></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid justify-content-center mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="https://twitter.com/_4ndreas"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo} className="App-logo" alt="logo" />
                </a>
                <h1>Mint 4ccess for Exclusive Content</h1>
              </div>
            </main>
          </div>
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto p-5">
                <h3>{444 - Number(this.state.totalSupply) + "/444"}</h3>
                <button onClick={this.mint}>MINT</button>
              </div>
            </main>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
