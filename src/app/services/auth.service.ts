import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from 'app/models/User';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  protected http = inject(HttpClient);
  protected url: string = environment.url;

  signUp(user: User): Observable<any> {
    return this.http.post<any>(`${this.url}/auth/register`, user, { withCredentials: true });
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.url}/auth/login`, user, { withCredentials: true });
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.url}/auth/logout`, {}, { withCredentials: true });
  }

  VerifyCodeProf(code: number) {
    return this.http.post<any>(`${this.url}/auth/verifyCode`, { code }, { withCredentials: true });
  }
}

