import * as React  from "react";
import Contract from "web3/eth/contract";
import {Loader} from "../Index/Loader/Loader";

export class WalletPage extends React.Component<WalletProps, WalletState> {

  public state: WalletState = {
    loading: false,
    error: false
  };

  public async componentDidMount() {
    if (!this.state.loading && !this.state.tokens && !this.state.error) {
      this.setState({ loading: true, error: false });

      try {
        const tokens = await this.props.wallet.methods.getOwnedTokens().call();

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
      return (<p>You have no tickets in your wallet.</p>);
    }
    else if (this.state.tokens) {
      return this.renderTokens(this.state.tokens);
    }

    return (<Loader text="Loading ticket wallet"/>);
  }

  private renderTokens(tokens: number[]) {
    return (
      <p>{tokens.join()}</p>
    );
  }
}

export interface WalletProps {
  wallet: Contract;
}

interface WalletState {
  loading: boolean;
  error: boolean;
  tokens?: number[];
}