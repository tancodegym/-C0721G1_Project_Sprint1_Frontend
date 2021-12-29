import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Employee} from "../model/employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private API_URL = 'http://localhost:8080/api';

  constructor(
    private http: HttpClient
  ) {
  }

  findById(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.API_URL + '/employee/detail/' + id);
  }
}
