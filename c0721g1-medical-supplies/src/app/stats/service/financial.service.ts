import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FinancialStats} from '../model/financial-stats';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {

  private API = 'http://localhost:8080/api';


  constructor(private http: HttpClient) {

  }

  getAll(): Observable<FinancialStats  | any> {
    return this.http.get<FinancialStats | any>(this.API + '/admin/stats/financial-stats');
  }

  searchFinancialStats(date: string): Observable<FinancialStats | any>{
    return this.http.get<FinancialStats | any>(this.API + '/admin/stats/financial-stats/'+date);
  }

}
