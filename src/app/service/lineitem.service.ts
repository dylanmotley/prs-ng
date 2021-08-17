import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lineitem } from '../model/lineitem.class';

const URL: string = 'http://localhost:8080/api/line-items';

@Injectable({
  providedIn: 'root'
})
export class LineitemService {
  constructor(
    private http: HttpClient
  ) { }

  list(): Observable<Lineitem[]> {
    return this.http.get(URL + '/') as Observable<Lineitem[]>;
  }

  get(id: number): Observable<Lineitem> {
    return this.http.get(URL + '/' + id) as Observable<Lineitem>;
  }

  create(lineitem: Lineitem): Observable<Lineitem> {
    return this.http.post(URL + "/", lineitem) as Observable<Lineitem>;
  }

  edit(lineitem: Lineitem): Observable<Lineitem> {
    return this.http.put(URL + "/", lineitem) as Observable<Lineitem>;
  }

  delete(id: number): Observable<Lineitem> {
    return this.http.delete(URL + '/' + id) as Observable<Lineitem>
  }

  getRequestLineitems(userId: number): Observable<Lineitem[]> {
      return this.http.get(URL + '/lines-for-pr/' +userId) as Observable<Lineitem[]>
  }

}