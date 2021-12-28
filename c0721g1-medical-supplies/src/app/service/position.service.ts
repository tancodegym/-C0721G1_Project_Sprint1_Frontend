import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private API_URL = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }
}
