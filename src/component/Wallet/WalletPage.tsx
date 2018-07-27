import * as React  from "react";
import Contract from "web3/eth/contract";
import {Loader} from "../Index/Loader/Loader";
import Web3 = require("web3");
import autobind from "autobind-decorator";

@autobind
export class WalletPage extends React.Component<WalletProps, WalletState> {

  public state: WalletState = {
    loading: false,
    error: false
  };

  public async componentDidMount() {
    if (!this.state.loading && !this.state.tokens && !this.state.error) {
      this.setState({ loading: true, error: false });

      try {
        const [from] = await this.props.web3.eth.getAccounts();
        const tokenIds = await this.props.wallet.methods.getOwnedTokens().call({ from });
        const promises: Array<Promise<TokenDetails>> = tokenIds.map(id => this.getTokenDetails(id, from));
        const tokens = await Promise.all(promises);

        this.setState({ loading: false, error: false, tokens });
      }
      catch (err) {
        console.log(err);

        this.setState({ error: true, loading: false, tokens: undefined });
      }
    }
  }

  public render() {
    if (this.state.error) {
      return (<p>Error</p>);
    }
    else if (this.state.tokens && this.state.tokens.length === 0) {
      return (<p>There are no tickets in your wallet. Are you sure you unlocked your account?</p>);
    }
    else if (this.state.tokens) {
      return this.renderTokens(this.state.tokens);
    }

    return (<Loader text="Loading ticket wallet"/>);
  }

  private renderTokens(tokens: TokenDetails[]) {
    return tokens.map((token, index) => (
      <p key={index}>{token.description}: {token.fulfilmentURI.substr(6)} ({TicketState[token.state].toString()})</p>
    ));
  }

  private async getTokenDetails(tokenId: number, from: string): Promise<TokenDetails> {
    const [description, fulfilmentURI, state] = await Promise.all([
      this.props.wallet.methods.getTicketDescriptionById(tokenId).call({ from }),
      this.props.wallet.methods.getFulfilmentURIById(tokenId).call({ from }),
      this.props.wallet.methods.getTicketStateById(tokenId).call({ from }),
    ]);

    return { description, fulfilmentURI, state };
  }
}

export interface WalletProps {
  wallet: Contract;
  web3: Web3;
}

interface WalletState {
  loading: boolean;
  error: boolean;
  tokens?: TokenDetails[];
}

interface TokenDetails {
  fulfilmentURI: string;
  description: string;
  state: TicketState;
}

enum TicketState {
  PAID = 0,
  FULFILLED = 1,
  CANCELLED = 2
}
