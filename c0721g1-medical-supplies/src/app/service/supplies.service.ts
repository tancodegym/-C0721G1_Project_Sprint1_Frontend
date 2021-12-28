import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs";
import {Supplies} from "../model/supplies";

@Injectable({
  providedIn: 'root'
})
export class SuppliesService {
  private API_URL = 'http://localhost:8080/home/list';
  constructor(private httpClient: HttpClient) {
  }
  getSuppliesList(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL)
  }
}
