import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PageSuppliesDTO} from '../dto/PageSuppliesDTO';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SuppliesService {
  private API_URL = 'http://localhost:8080';

  constructor(
    private http: HttpClient
  ) {
  }

  getListSupplies(pageSuppliesDTO: PageSuppliesDTO): Observable<any> {
    const code = pageSuppliesDTO.code;
    const name = pageSuppliesDTO.name;
    const suppliesTypeId = pageSuppliesDTO.suppliesType;
    const page = pageSuppliesDTO.page;
    const size = pageSuppliesDTO.size;
    return this.http.get<any>(this.API_URL + '/api/admin/supplies/?code=' + code + '&name=' + name + '&suppliesType='
      + suppliesTypeId + '&page=' + page + '&size=' + size);
  }
  deleteSupplies(id: number): Observable<void> {
    return this.http.delete<void>(this.API_URL + '/api/admin/supplies/' + id);
  }
}
