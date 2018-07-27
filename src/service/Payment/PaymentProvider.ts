import Web3 = require("web3");
import Contract from "web3/eth/contract";
import {OrderData} from "../Order/OrderService";

export class PaymentProvider {

  constructor(
    private readonly web3: Web3,
    private readonly contract: Contract,
  ) {}

  public async pay(order: OrderData): Promise<EthereumTransaction> {
    const [from] = await this.web3.eth.getAccounts();

    return this.contract.methods.createTicket(
      "description",
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
      console.log("Waiting for reference");

      try {
        reference = await this.contract.methods.getFulfilmentURIById(tokenId).call({ from });
      }
      catch (err) {}
    }

    return reference.substr(6);
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
