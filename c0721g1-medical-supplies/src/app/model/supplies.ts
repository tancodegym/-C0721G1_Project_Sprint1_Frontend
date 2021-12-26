import {Producer} from "./producer";
import {SuppliesType} from "./supplies-type";
import {OrderDetail} from "./order-detail";
import {Warehouse} from "./warehouse";

export class Supplies {
  id: number;
  code: string;
  name: string;
  price: number;
  productionDate: string;
  expiryDate:string;
  introduce: string;
  technicalInformation: string;
  image: string;
  producer: Producer;
  supplies_type: SuppliesType;
  orderDetail: OrderDetail;
  warehouse: Warehouse;
}
