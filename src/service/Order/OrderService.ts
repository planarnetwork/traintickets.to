import {AxiosInstance} from "axios";
import {SelectedOptions} from "../../component/Index/IndexPage";

export class OrderService {

  constructor(
    private readonly client: AxiosInstance
  ) {}

  public async createOrder(selected: SelectedOptions): Promise<OrderResponse> {
    const request: any = {
      "items": {
        "outward": {
          "journey": selected.outward
        },
        "fares": {}
      }
    };

    if (selected.inward) {
      request.items.inward = { journey: selected.inward };

      if (selected.fareOptions.length === 1) {
        request.items.fares.return = selected.fareOptions[0];
      }
      else {
        request.items.fares.outwardSingle = selected.fareOptions[0];
        request.items.fares.inwardSingle = selected.fareOptions[1];
      }
    }
    else {
      request.items.fares.outwardSingle = selected.fareOptions[0];
    }

    const response = await this.client.post<OrderResponse>("/order", request);

    return response.data;
  }
}

export interface OrderResponse {
  data: OrderData;
  links: any;
}

export interface OrderData {
  price: string;
  signature: string;
  uri: string;
  expiry: number;
  address: string;
}
