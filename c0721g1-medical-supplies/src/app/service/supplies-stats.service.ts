import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SuppliesStats} from '../model/SuppliesStats';

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
    // tslint:disable-next-line:max-line-length
    return this.http.get<SuppliesStats | any>(this.API + '/admin/stats/supplies-stats/fetch?startDate=' + startDate + '&endDate=' + endDate);
  }

}
