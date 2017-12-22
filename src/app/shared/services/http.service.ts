import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import C from './constants';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class HttpService {
  constructor(private _http: HttpClient, private _auth: AuthService) {
  }

  public generateRequest(method: string, domain: string, endpoint?: string, params?: any, body?: any): Observable<any> {
    const headers = new HttpHeaders({'Authorization': `JWT ${this._auth.token}`, 'Content-Type': 'application/json'});
    const options = {headers: headers, body: body};
    const pathEndpoint = endpoint ? `/${endpoint}` : '';
    const path = `${domain}${pathEndpoint}`;
    return this._http.request(method, `${C.server}${path}${this.generateParams(params)}`, options)
      .pipe(
        map((response) => response)
      );
  }

  public generateParams(params?: any) {
    let queryString = '?';
    if (params) {
      Object.keys(params).forEach((key) => {
        queryString += `${key}=${params[key]}&`;
      });
    }
    return queryString.slice(0, -1);
  }

}
