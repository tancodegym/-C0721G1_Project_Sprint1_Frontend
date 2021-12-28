import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private API_URL = 'http://localhost:8080';

  constructor(
    private http: HttpClient
  ) {
  }

  findById(id: number) {
    return this.http.get(this.API_URL + '/employee/detail/' + id);
  }
  getCode(): (any) {
    return this.http.get(this.API_URL + '/admin/employee/code');
  }

}
