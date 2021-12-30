import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RequestMail} from "../model/requestMail";

@Injectable({
  providedIn: 'root'
})
export class RequestMailService {
  private API_URL='http://localhost:8080/api/public/send-email';
  constructor(private httpClient: HttpClient) { }

  // @ts-ignore
  sendEmail(requestMail: RequestMail): Observable<void> {
    console.log(requestMail)
    return this.httpClient.post<void>(this.API_URL, requestMail);
  }
}
