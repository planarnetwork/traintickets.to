import {Component} from 'react';
import Web3Container from '../Web3/Web3Container';
import './Wallet.css';

class Wallet extends Component {
  state = {};
  
  render () {
    return (
      <Layout>
        <h1>Tickets</h1>
      </Layout>
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