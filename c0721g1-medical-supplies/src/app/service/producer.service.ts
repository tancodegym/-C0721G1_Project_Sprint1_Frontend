import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Producer} from '../model/producer';


const API_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class ProducerService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Producer[]> {
    return this.http.get<Producer[]>(API_URL + '/api/admin/producer/list');
  }
}
