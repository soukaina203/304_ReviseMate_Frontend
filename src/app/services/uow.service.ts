import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { ClasseService } from './classe.service';
import { FicheService } from './fiche.service';
import { CarteService } from './carte.service';
import { QuizService } from './quiz.service';

@Injectable({
  providedIn: 'root'
})
export class UowService {

  constructor() { }
  users= new UserService();
  classes= new ClasseService();
  fiches= new FicheService();
  cartes= new CarteService();
  quiz= new QuizService();

}
