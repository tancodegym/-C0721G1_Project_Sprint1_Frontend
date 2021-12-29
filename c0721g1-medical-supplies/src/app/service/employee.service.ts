import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../model/employee';

const API_URL = 'http://localhost:8080';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {
  }
  findById(id: number): Observable<Employee> {
    return this.http.get<Employee>(API_URL + '/api/employee/edit-detail/' + id);
  }

  update(employee: Employee): Observable<void> {
    return this.http.patch<void>(API_URL + '/api/employee/edit-detail/update', employee);
  }


}
