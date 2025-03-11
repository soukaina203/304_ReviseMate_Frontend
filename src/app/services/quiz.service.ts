import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
import { Quiz } from 'app/models/Quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService  extends SuperService<Quiz>{

  constructor() {
    super('super/quiz');

   }
}
