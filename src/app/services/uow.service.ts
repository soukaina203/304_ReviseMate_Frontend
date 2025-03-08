import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { ClasseService } from './classe.service';

@Injectable({
  providedIn: 'root'
})
export class UowService {

  constructor() { }
  users= new UserService();
  classes= new ClasseService();
}
