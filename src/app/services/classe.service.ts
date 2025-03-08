import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
import { Classe } from 'app/models/Classe';

@Injectable({
  providedIn: 'root'
})
export class ClasseService  extends SuperService<Classe>{

  constructor() {
    super('super/classe');

   }
}
