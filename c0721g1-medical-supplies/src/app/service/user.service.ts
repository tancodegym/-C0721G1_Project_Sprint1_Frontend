import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from "../model/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_USER = "http://localhost:8080/api/editPass";
  private API_USERFIND = "http://localhost:8080/api/find";

  constructor(private http: HttpClient) {
  }

  changePass(user: User): Observable<void> {
    return this.http.patch<void>(this.API_USER, user);
  }

  find(id: number): Observable<User> {
    return this.http.get<User>(this.API_USERFIND + "/" + id);
  }
}
