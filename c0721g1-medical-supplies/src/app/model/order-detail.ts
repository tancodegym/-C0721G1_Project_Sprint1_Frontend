import {Customer} from './customer';
import {Supplies} from './supplies';

export class OrderDetail {
  id: number;
  // tslint:disable-next-line:variable-name
  order_date: string;
  // tslint:disable-next-line:variable-name
  total_money: number;
  customer: Customer;
  supplies: Supplies;
}
