// @ts-ignore
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../model/employee';

const API_URL = 'http://localhost:8080';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {
  }

  save(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(API_URL + '/api/employee-detail/create', employee);
  }

  update(employee): Observable<Employee> {
    return this.http.put<Employee>(`${API_URL}/api/employee-detail/edit`, employee);
  }
}
