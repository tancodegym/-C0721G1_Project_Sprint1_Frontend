import {Producer} from './producer';
import {SuppliesType} from './supplies-type';

export class Supplies {
  id: number;
  code: string;
  name: string;
  price: number;
  // tslint:disable-next-line:variable-name
  production_date: string;
  // tslint:disable-next-line:variable-name
  expiry_date: string;
  image: string;
  introduce: string;
  // tslint:disable-next-line:variable-name
  technical_information: string;
  producer: Producer;
  // tslint:disable-next-line:variable-name
  supplies_type: SuppliesType;
}
