import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
import { User } from 'app/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService extends SuperService<User>{

  constructor() {
    super('user');

   }
}
