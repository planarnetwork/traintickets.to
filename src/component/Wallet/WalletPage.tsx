import * as React  from "react";
import Contract from "web3/eth/contract";

export class WalletPage extends React.Component<WalletProps> {

  public render() {

    console.log(Object.keys(this.props.wallet.methods));

    return (
      <p>Hello</p>
    );
  }

}

export interface WalletProps {
  wallet: Contract;
}
