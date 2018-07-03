import {Component} from 'react';
const Web3Container = require('../Web3/Web3Container');
import './Wallet.css';

class Wallet extends Component {
  state = {};
  
  render () {
    return (
      <div>
        <h1>Tickets</h1>
      </div>
    )
  };
}

export default () => (
  <Web3Container
    renderLoading={() => <div>Loading Tickets...</div>}
    render={({ account, contract }) => (
      <Wallet account={account} contract={contract} />
    )}
  />
)