// @ts-ignore
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Supplies} from '../model/supplies';

const API_URL = 'http://localhost:8080';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class SuppliesService {

  constructor(private http: HttpClient) {
  }
  save(supplies: Supplies): Observable<Supplies> {
    return this.http.post<Supplies>(API_URL + '/api/admin/supplies/create', supplies);
  }
  update(supplies): Observable<Supplies> {
    return this.http.put<Supplies>(`${API_URL}/api/admin/supplies/edit`, supplies);
  }
}
