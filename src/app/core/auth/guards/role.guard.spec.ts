import { CanActivateFn, CanActivateChildFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

export const RoleGuard: CanActivateFn | CanActivateChildFn = (route, state) => {
    const router: Router = inject(Router);
    const userRole = localStorage.getItem('role'); // Get role from localStorage

    // Allowed roles from route data
    const allowedRoles: string[] = route.data?.['roles'] || [];

    // If the user role exists and is in the allowedRoles, grant access
    if (userRole && allowedRoles.includes(userRole)) {
        return of(true);
    } else {
        // Redirect to unauthorized page if access is denied
        const urlTree = router.parseUrl('/unauthorized');
        return of(urlTree);
    }
};
