import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
import { Cours } from 'app/models/Cours';

@Injectable({
  providedIn: 'root'
})
export class CoursService extends SuperService<Cours>{

  constructor() {
    super('cours');

   }
}
