import {Salary} from "./salary";
import {User} from "./user";
import {Position} from "./position";

export class Employee {
  id: number;
  code: string;
  name: string;
  birthday: string;
  image: string;
  salary: Salary;
  gender: string;
  address: string;
  user: User;
  position: Position;
}
