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

  changePass(user: User, id: number): Observable<User | any> {
    return this.http.patch(this.API_USER + "/" + id, user);
  }

  find(id: number): Observable<User | any> {
    return this.http.get(this.API_USERFIND + "/" + id);
  }
}
