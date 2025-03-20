import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperService<T> {
  protected http = inject(HttpClient);
  protected urlApi: string = environment.apiUrl;
  protected url: string = environment.url;

  constructor(public controller: string) {}

  getAll = () => this.http.get<T>(`${this.url}/${this.controller}`, { withCredentials: true });

  put = (id: string | string, o: T) => this.http.patch<any>(`${this.url}/${this.controller}/${id}`, o, { withCredentials: true });

  get = () => this.http.get<T[]>(`${this.url}/${this.controller}/get`, { withCredentials: true });

  count = () => this.http.get<number>(`${this.url}/${this.controller}/count`, { withCredentials: true });

  getOne = (id: any) => this.http.get<T>(`${this.url}/${this.controller}/${id}`, { withCredentials: true });

  post = (o: T) => this.http.post<T>(`${this.url}/${this.controller}`, o, { withCredentials: true });

  patch(id: number, model: { op: string, path: string, value: any }[]) {
    return this.http.patch<T>(`${this.url}/${this.controller}/${id}`, model, { withCredentials: true });
  }

  delete = (id: any) => this.http.delete<any>(`${this.url}/${this.controller}/${id}`, { withCredentials: true });
}
