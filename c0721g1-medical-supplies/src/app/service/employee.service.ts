import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
// @ts-ignore
import {PageEmployeeDTO} from '../dto/PageEmployeeDTO';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  httpOptions: any;
  private API_URL = 'http://localhost:8080/api';
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }
  getListEmployee(pageEmployeeDTO: PageEmployeeDTO): Observable<any> {
    const code = pageEmployeeDTO.code;
    const name = pageEmployeeDTO.name;
    const positionId = pageEmployeeDTO.positionId;
    const page = pageEmployeeDTO.page;
    const size = pageEmployeeDTO.size;
    return this.http.get<any>(this.API_URL + '/admin/employee?code=' + code + '&name=' + name + '&positionId='
      + positionId + '&page=' + page + '&size=' + size, this.httpOptions);
  }
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete<void>(this.API_URL + '/admin/employee/' + id, this.httpOptions);
  }
}
