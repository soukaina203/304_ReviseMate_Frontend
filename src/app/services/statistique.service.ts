import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
import { Statistique } from 'app/models/Statistique';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService extends SuperService<Statistique>{

  constructor() {
    super('statistique');

   }
}
