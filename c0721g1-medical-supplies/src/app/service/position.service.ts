import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Position} from '../model/position';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private API_URL = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }
  getListPosition(): Observable<Position[]> {
    return this.http.get<Position[]>(this.API_URL + '/position');
  }
}
