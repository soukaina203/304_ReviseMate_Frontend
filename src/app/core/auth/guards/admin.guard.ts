import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { of, switchMap } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
 const router: Router = inject(Router);
    const role = localStorage.getItem('role');
    // Check the authentication status

    return inject(AuthService).check().pipe(
        switchMap((authenticated) => {
            if (role != "Admin" ) {
                const redirectURL = state.url === '/sign-out' ? '' : `redirectURL=${state.url}`;
                const urlTree = router.parseUrl(`sign-in?${redirectURL}`);

                return of(urlTree);
            }
            return of(true);
        })
    );
};
