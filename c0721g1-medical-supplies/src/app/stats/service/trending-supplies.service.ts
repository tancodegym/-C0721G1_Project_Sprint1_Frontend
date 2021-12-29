import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SuppliesStats} from "../model/supplies-stats";
import {TrendingSupllies} from "../model/trending-supllies";

@Injectable({
  providedIn: 'root'
})
export class TrendingSuppliesService {
  private API = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getAll(): Observable<TrendingSupllies | any> {
    return this.http.get<TrendingSupllies | any>(this.API + '/admin/stats/supplies-stats/trending-supplies');
  }
}
