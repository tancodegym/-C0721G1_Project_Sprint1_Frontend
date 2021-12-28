import {Producer} from "./producer";
import {SuppliesType} from "./supplies-type";

export class Supplies {
  id: number;
  code: string;
  name: string;
  price: number;
  production_date: string;
  expiry_date:string;
  image: string;
  introduce: string;
  technical_information: string;
  producer: Producer;
  supplies_type: SuppliesType;
}
