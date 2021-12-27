// @ts-ignore
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Supplies} from '../model/supplies';
import {environment} from '../../environments/environment';
import {SuppliesType} from '../model/supplies-type';
import {Producer} from '../model/producer';

const API_URL = 'http://localhost:8080';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class SuppliesTypeService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<SuppliesType[]> {
    return this.http.get<SuppliesType[]>(API_URL + '/api/admin/suppliesType/list');
  }
}
