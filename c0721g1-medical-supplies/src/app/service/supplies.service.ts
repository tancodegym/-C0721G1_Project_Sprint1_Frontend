// @ts-ignore
import { Injectable } from '@angular/core';
// @ts-ignore
import {HttpClient, HttpClientModule} from '@angular/common/http';
// @ts-ignore
import {Observable} from 'rxjs';
import {Supplies} from '../model/supplies';
import {CustomerTransfer} from '../model/customerTransfer';
import {Cart} from '../model/cart';
import {Payment} from '../model/payment';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class SuppliesService {
  private API_URL = 'http://localhost:8080/home/';
  constructor(private httpClient: HttpClient) {
  }
  cartList: Cart[] = [];
  getSuppliesList(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + 'list');
  }
  findById(id: number ): Observable<Supplies> {
    return this.httpClient.get<Supplies>(this.API_URL + 'detail/' + id);
  }
  payment(payment: Payment): Observable<any> {
    console.log(payment);
    return this.httpClient.post<any>(this.API_URL + 'payment', payment);
  }
  saveCartListTemp(cartList: Cart[]) {
    this.cartList = cartList;
  }
  getCartList( ) {
    return this.cartList;
  }
}
