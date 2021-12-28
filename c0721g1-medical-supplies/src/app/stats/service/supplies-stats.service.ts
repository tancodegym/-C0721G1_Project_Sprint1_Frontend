import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Supplies} from '../../model/supplies';
import {SuppliesStats} from '../model/supplies-stats';

@Injectable({
  providedIn: 'root'
})
export class SuppliesStatsService {

  private API = 'http://localhost:8080/api';

  startDate: any;
  endDate: any;

  constructor(private http: HttpClient) {

  }
  getAll(): Observable<SuppliesStats | any> {
    return this.http.get<SuppliesStats | any>(this.API + '/admin/stats/supplies-stats');
  }

  searchSuppliesStats(startDate: string, endDate: string): Observable<SuppliesStats | any> {
    return this.http.get<SuppliesStats | any>(this.API + '/admin/stats/supplies-stats/fetch?startDate='+startDate+'&endDate='+endDate)
  }



  // find(suppliesStatsSearch: SuppliesStats): Observable<SuppliesStats []>{
  //
  //     return this.http.get<SuppliesStats[]>(
  //       this.API + "/fetch" +
  //       "?" +
  //       // fromday
  //       "&customer_name_like=" +
  //       s +
  //       // today
  //       "&customer_birthday_like=" +
  //       customerSearch.customer_birthday)
  //
  //   }


}