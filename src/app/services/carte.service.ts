import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
import { CarteMemoire } from 'app/models/Carte';

@Injectable({
  providedIn: 'root'
})
export class CarteService  extends SuperService<CarteMemoire>{

  constructor() {
    super('super/carte_memoire');

   }
}
