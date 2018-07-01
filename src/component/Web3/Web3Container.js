import {Component} from 'react';
import getWeb3 from './getWeb3';
import getContract from './getContract';
import walletDefinition from './TicketWallet.json';

export default class Web3Container extends Component {
  state = {web3: null, account: null, wallet: null};
  
  async getAccounts(web3) {
    return web3.eth.getAccounts();
  }
  
  async componentDidMount() {
    try {
      const web3 = await getWeb3();
      const accounts = await this.getAccounts(web3);
      const wallet = await getContract(web3, walletDefinition);
      
      const account = accounts[0];
      
      this.setState({web3, account, wallet});
    } catch (error) {
      alert(`Failed to load web3 or accounts. Check console for details.`);
      console.log(error);
    }
  }
  
  render() {
    const {web3, account, wallet} = this.state;
    return web3 && account && retailers && wallet
      ? this.props.render({web3, account, wallet})
      : this.props.renderLoading();
  }
}
