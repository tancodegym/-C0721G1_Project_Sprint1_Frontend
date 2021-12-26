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

  constructor(private http: HttpClient) {

  }
  getAll(): Observable<SuppliesStats | any> {
    return this.http.get<SuppliesStats | any>(this.API + '/admin/stats/supplies-stats');
  }
}
