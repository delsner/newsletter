import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {User} from '../types';
import {Router} from "@angular/router";

@Injectable()
export class AuthService {
  public token: string;
  private baseUrl = 'https://newsletter-server.herokuapp.com';
  private currentUser$: ReplaySubject<User> = new ReplaySubject<User>(1);

  constructor(private http: HttpClient,
              private router: Router) {
    if (localStorage.getItem('email-jwt')) {
      this.token = localStorage.getItem('email-jwt');
      this.currentUser$.next(this.getUserInfoFromToken());
    }
  }

  public get currentUser(): ReplaySubject<User> {
    return this.currentUser$;
  }

  public set currentUser(value: ReplaySubject<User>) {
    this.currentUser$ = value;
  }

  public login(username: string, password: string): Observable<boolean> {
    return this.http.post(`${this.baseUrl}/login`, {username: username, password: password})
      .pipe(
        map((response: any) => {
          // login successful if there's a jwt token in the response
          const token = response && response.token;
          if (token) {
            this.token = token;
            localStorage.setItem('email-jwt', token);
            this.currentUser$.next(this.getUserInfoFromToken());
            return true;
          } else {
            return false;
          }
        })
      );
  }

  public signup(username: string, password: string): Observable<boolean> {
    return this.http.post(`${this.baseUrl}/signup`, {username: username, password: password})
      .pipe(
        map((response: any) => {
          // login successful if there's a jwt token in the response
          const token = response && response.token;
          if (token) {
            this.token = token;
            localStorage.setItem('email-jwt', token);
            this.currentUser$.next(this.getUserInfoFromToken());
            return true;
          } else {
            return false;
          }
        })
      );
  }

  public logout(): void {
    this.token = null;
    localStorage.removeItem('email-jwt');
    this.currentUser$.next(null);
    this.router.navigateByUrl('/');
  }

  public isAuthenticated() {
    const token = localStorage.getItem('email-jwt');
    if (token) {
      if (new Date() > new Date(this.parseToken(token).exp * 1000)) {
        localStorage.removeItem('email-jwt');
        this.currentUser$.next(null);
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  public getUserInfoFromToken(): User {
    const token = localStorage.getItem('email-jwt');
    if (token) {
      return this.parseToken(token).user;
    }
  }

  private parseToken(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
}
