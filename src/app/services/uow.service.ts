import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { ClasseService } from './classe.service';
import { FicheService } from './fiche.service';
import { CarteService } from './carte.service';
import { QuizService } from './quiz.service';
import { AuthService } from './auth.service';
import { IaGenerationService } from './ia-generation.service';
import { QuizDataService } from './quiz-data.service'; // Importez le nouveau service

@Injectable({
  providedIn: 'root'
})
export class UowService {

  constructor(private quizDataService: QuizDataService) {
    this.quiz = new QuizService();
    this.users = new UserService();
    this.classes = new ClasseService();
    this.fiches = new FicheService();
    this.cartes = new CarteService();
    this.auth = new AuthService();
    this.ia = new IaGenerationService();
  }

  users: UserService;
  classes: ClasseService;
  fiches: FicheService;
  cartes: CarteService;
  quiz: QuizService;
  auth: AuthService;
  ia: IaGenerationService;

  getQuizQuestions(quizId: string) {
    return this.quizDataService.getQuizQuestions(quizId);
  }
}
