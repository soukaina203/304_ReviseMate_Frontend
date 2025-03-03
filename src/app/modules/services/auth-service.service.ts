import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from 'app/models/User';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }
  protected http = inject(HttpClient);
  protected urlApi: string = environment.apiUrl;// InjectService.injector.get('API_URL');
  protected url: string = environment.url;


  signUp(user:User): Observable<any> {
    return this.http.post(`${this.urlApi}/AuthController/register`, user);

  }

  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.urlApi}/AuthController/login`, user);
    //   .pipe(
    //     tap(response => {
    //         console.log("from api")
    //       console.log('Response:', response);
    //       if(response.code===1){
    //         this._authenticated=true
    //       }
    //       // Perform actions based on the response
    //     })
    //   );
  }
}
