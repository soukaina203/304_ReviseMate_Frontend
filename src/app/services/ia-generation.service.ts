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

  // Fonction pour obtenir la réponse de l'IA à partir d'un fichier PDF
  getIAanswerFromPdf(formData: FormData, type: 'fiche' | 'carte' | 'quiz') {
    const endpoint = type === 'fiche'
      ? 'revision/pdf'
      : type === 'carte'
      ? 'flashcard/pdf'
      : 'quizzes/pdf';
    return this.http.post(`${this.url}/${endpoint}`, formData);
  }

  // Fonction pour obtenir la réponse de l'IA à partir d'un texte
  getIAanswerFromText(textData: { text: string, customPrompt?: string }, type: 'fiche' | 'carte' | 'quiz') {
    const endpoint = type === 'fiche'
      ? 'revision'
      : type === 'carte'
      ? 'flashcard'
      : 'quizzes';

    // Adaptez le champ selon le type
    const dataToSend = type === 'fiche'
      ? { text: textData.text, ...(textData.customPrompt && { customPrompt: textData.customPrompt }) }
      : type === 'carte'
      ? { content: textData.text, ...(textData.customPrompt && { customPrompt: textData.customPrompt }) }
      : { content: textData.text };

    return this.http.post(`${this.url}/${endpoint}`, dataToSend);
  }
}
