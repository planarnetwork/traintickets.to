import {OrderResponse} from "../../component/Footer/OrderSummary/OrderSummary";
import Web3 = require("web3");
import Contract from "web3/eth/contract";

export class PaymentProvider {

  constructor(
    private readonly web3: Web3,
    private readonly contract: Contract,
  ) {}

  public async pay(order: OrderResponse): Promise<EthereumTransaction> {
    const [from] = await this.web3.eth.getAccounts();

    return this.contract.methods.createTicket(
      toBytes32("description"),
      order.expiry,
      order.price,
      order.address,
      toBytes32(order.uri),
      order.signature,
    ).send({
      value: order.price,
      from: from
    });
  }

}

/**
 * Convert a string to a bytes32 string
 */
function toBytes32(str: string): string {
  let hex = '0x';

  for (let i = 0; i < 32; i++) {
    hex += str.length > i ? str.charCodeAt(i).toString(16) : '00';
  }

  return hex;
}

export interface EthereumTransaction {
  tx: string;
}
