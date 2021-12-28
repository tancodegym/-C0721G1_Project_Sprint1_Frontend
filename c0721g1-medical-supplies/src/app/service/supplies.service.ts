// @ts-ignore
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Supplies} from '../model/supplies';
import {SuppliesType} from '../model/supplies-type';

const API_URL = 'http://localhost:8080';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class SuppliesService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Supplies[]> {
    return this.http.get<Supplies[]>(API_URL + '/api/admin/supplies/list');
  }

  save(supplies: Supplies): Observable<void> {
    console.log(supplies);
    return this.http.post<void>(API_URL + '/api/admin/supplies/create', supplies);
  }

  update(supplies): Observable<void> {
    return this.http.put<void>(`${API_URL}api/admin/supplies/edit`, supplies);
  }

  getCode(): (any) {
    return this.http.get(API_URL + '/api/admin/supplies/code');
  }
}
