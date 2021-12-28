import {Producer} from './producer';
import {SuppliesType} from './supplies-type';

export class Supplies {
  id: number;
  code: string;
  name: string;
  price: number;
  // tslint:disable-next-line:variable-name
  productionDate: string;
  // tslint:disable-next-line:variable-name
  expiryDate: string;
  image: string;
  introduce: string;
  // tslint:disable-next-line:variable-name
  technicalInformation: string;
  producer: Producer;
  // tslint:disable-next-line:variable-name
  suppliesType: SuppliesType;
}
