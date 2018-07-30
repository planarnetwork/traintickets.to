import * as React  from "react";
import {Loader} from "../Index/Loader/Loader";
import autobind from "autobind-decorator";
import {Wallet, TokenDetails, TicketState} from "../../service/Wallet/Wallet";
import "./Wallet.css";

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
        const tokens = await this.props.wallet.getWalletTokens();

        this.setState({ loading: false, error: false, tokens });
      }
      catch (err) {
        console.log(err);

        this.setState({ error: true, loading: false, tokens: undefined });
      }
    }
  }

  public render() {
    const content = this.getContent();

    return (
      <section className="wallet">
        <h2 className="page-title">Ticket Wallet</h2>
        <div className="container">
          <div className="row">
            <div className="col-md-18 offset-md-3 col-lg-14 offset-lg-5">
              {content}
            </div>
          </div>
        </div>
      </section>
    );
  }

  private getContent() {
    if (this.state.error) {
      return (<p>Error</p>);
    }
    else if (this.state.tokens && this.state.tokens.length === 0) {
      return (<p>There are no tickets in your wallet. Are you sure you unlocked your account?</p>);
    }
    else if (this.state.tokens) {
      return (
          <table className="wallet--list">
            <thead className="sr-only">
              <tr className="row wallet--header">
                <th className="col-lg-12 wallet--header-journey">Journey</th>
                <th className="col-12 col-lg-8 wallet--header-collection">Collection ref</th>
                <th className="col-12 col-lg-4 wallet--header-status">Status</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTokens(this.state.tokens)}
            </tbody>
          </table>
        )
    }

    return (<Loader text="Loading ticket wallet"/>);
  }

  private renderTokens(tokens: TokenDetails[]) {
    return tokens.map((token, index) => (
      <tr key={index} className={'row wallet--item wallet--item__' + TicketState[token.state].toString().toLowerCase()}>
        <td className="col wallet--journey">{token.description}</td>
        <td className="col-12 wallet--ctr">{token.fulfilmentURI.substr(6)}</td>
        <td className={'col-12 wallet--status wallet--status__' + TicketState[token.state].toString().toLowerCase()}>{TicketState[token.state].toString()}</td>
      </tr>
    ));
  }
}

export interface WalletProps {
  wallet: Wallet;
}

interface WalletState {
  loading: boolean;
  error: boolean;
  tokens?: TokenDetails[];
}
