import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
import { Question } from 'app/models/Question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService extends SuperService<Question>{

  constructor() {
    super('super/question');

   }

   getQuizQuestions(idQuiz: string) {
     return this.http.get(`${this.url}/question/quiz/${idQuiz}`);
   }
}
