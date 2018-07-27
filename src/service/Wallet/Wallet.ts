import Web3 = require("web3");
import Contract from "web3/eth/contract";
import {OrderData} from "../Order/OrderService";

export class Wallet {

  constructor(
    private readonly web3: Web3,
    private readonly wallet: Contract,
  ) {}

  public async pay(order: OrderData, description: string): Promise<EthereumTransaction> {
    const [from] = await this.web3.eth.getAccounts();

    return this.wallet.methods.createTicket(
      description,
      order.uri,
      order.expiry,
      order.address,
      order.signature,
    ).send({
      value: order.price,
      from: from
    });
  }

  public getEthPrice(wei: string): string {
    return this.web3.utils.fromWei(wei, "ether") as string;
  }

  public async getFulfilment(tokenId: number): Promise<string> {
    let reference = "";
    const [from] = await this.web3.eth.getAccounts();

    while (reference === "") {
      try {
        reference = await this.wallet.methods.getFulfilmentURIById(tokenId).call({ from });
      }
      catch (err) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }

    return reference.substr(6);
  }

  public async getWalletTokens(): Promise<TokenDetails[]> {
    const [from] = await this.web3.eth.getAccounts();
    const tokenIds = await this.wallet.methods.getOwnedTokens().call({ from });
    const promises: Array<Promise<TokenDetails>> = tokenIds.map(id => this.getTokenDetails(id, from));

    return await Promise.all(promises);
  }

  private async getTokenDetails(tokenId: number, from: string): Promise<TokenDetails> {
    const [description, fulfilmentURI, state] = await Promise.all([
      this.wallet.methods.getTicketDescriptionById(tokenId).call({ from }),
      this.wallet.methods.getFulfilmentURIById(tokenId).call({ from }),
      this.wallet.methods.getTicketStateById(tokenId).call({ from }),
    ]);

    return { description, fulfilmentURI, state };
  }

}

export interface EthereumTransaction {
  events: {
    Transfer: {
      returnValues: {
        0: string;
        1: string;
        2: number;
      }
    }
  }
}

export interface TokenDetails {
  fulfilmentURI: string;
  description: string;
  state: TicketState;
}

export enum TicketState {
  Paid = 0,
  Fulfilled = 1,
  Cancelled = 2
}
