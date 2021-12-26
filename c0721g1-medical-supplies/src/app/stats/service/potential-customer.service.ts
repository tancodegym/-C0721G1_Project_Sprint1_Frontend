import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PotentialCustomer} from '../model/potential-customer';


@Injectable({
  providedIn: 'root'
})
export class PotentialCustomerService {

  private API = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
  }
  getAll(): Observable<PotentialCustomer[] | any> {
    return this.http.get<PotentialCustomer[] | any>(this.API + "/admin/stats/potential-customer");
  }
}


