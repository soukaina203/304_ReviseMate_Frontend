import { CanActivateFn, CanActivateChildFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

export const RoleGuard: CanActivateFn | CanActivateChildFn = (route, state) => {
    const router: Router = inject(Router);
    const userRole = localStorage.getItem('role'); // Récupère le rôle depuis localStorage
  
    const allowedRoles: string[] = route.data?.['roles'] || [];
  
    if (userRole && allowedRoles.includes(userRole)) {
      return of(true);
    } else {
      const urlTree = router.parseUrl('/unauthorized');
      return of(urlTree);
    }
  };
  

