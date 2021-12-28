import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PageEmployeeDTO} from '../dto/PageEmployeeDTO';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private API_URL = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }
  getListEmployee(pageEmployeeDTO: PageEmployeeDTO): Observable<any> {
    const code = pageEmployeeDTO.code;
    const name = pageEmployeeDTO.name;
    const positionId = pageEmployeeDTO.positionId;
    const page = pageEmployeeDTO.page;
    const size = pageEmployeeDTO.size;
    return this.http.get<any>(this.API_URL + '/admin/employee?code=' + code + '&name=' + name + '&positionId='
      + positionId + '&page=' + page + '&size=' + size);
  }
}
