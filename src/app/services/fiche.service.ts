import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
import { Fiche } from 'app/models/Fiche';

@Injectable({
  providedIn: 'root'
})
export class FicheService extends SuperService<Fiche>{

  constructor() {
    super('super/fiche');

   }
}
