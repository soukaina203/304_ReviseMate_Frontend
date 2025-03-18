import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
import { Role } from 'app/models/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends SuperService<Role>{

  constructor() {
    super('super/role');

   }
}
