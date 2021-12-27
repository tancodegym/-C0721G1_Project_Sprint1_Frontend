import {Supplies} from './supplies';

export class Warehouse {
  id: number;
  name: string;
  // tslint:disable-next-line:variable-name
  broken_supplies: number;
  // tslint:disable-next-line:variable-name
  normal_supplies: number;
  // tslint:disable-next-line:variable-name
  import_date: string;
  price: number;
  quantity: number;
  unit: string;
  supplies: Supplies;
}
