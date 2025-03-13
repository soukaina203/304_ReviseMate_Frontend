import { IA } from './../models/IA';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IaGenerationService {
  protected http = inject(HttpClient);
  protected url: string = environment.url;

  constructor() {}

  getIAanswerFromPdf(formData: FormData) {
    return this.http.post(`${this.url}/revision/pdf`, formData);
  }

  getIAanswerFromText(textData: { text: string, customPrompt?: string }) {
    return this.http.post(`${this.url}/revision`, textData);
  }
}