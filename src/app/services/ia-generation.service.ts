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

  getIAanswerFromPdf(formData: FormData, type: 'fiche' | 'carte' | 'quiz') {
    const endpoint = type === 'fiche' 
      ? 'revision/pdf' 
      : type === 'carte' 
      ? 'flashcard/pdf' 
      : 'quizzes/pdf';  // Endpoint pour le quiz à partir d'un PDF
    return this.http.post(`${this.url}/${endpoint}`, formData);
  }

  getIAanswerFromText(textData: { text: string, customPrompt?: string }, type: 'fiche' | 'carte' | 'quiz') {
    const endpoint = type === 'fiche' 
      ? 'revision' 
      : type === 'carte' 
      ? 'flashcard' 
      : 'quizzes';  // Endpoint pour le quiz à partir du texte
    
    // Adaptez le champ selon le type
    const dataToSend = type === 'fiche' 
      ? { text: textData.text, ...(textData.customPrompt && { customPrompt: textData.customPrompt }) }
      : type === 'carte'
      ? { content: textData.text, ...(textData.customPrompt && { customPrompt: textData.customPrompt }) }
      : { content: textData.text };  // Données envoyées pour le quiz

    return this.http.post(`${this.url}/${endpoint}`, dataToSend);
  }
}
