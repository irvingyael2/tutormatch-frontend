import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateChildFn = async (childRoute, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = await authService.waitForAuthReady();

  if (isAuthenticated) {
    return true;
  }

  router.navigate(['/']);
  return false;
};

export const publicGuard: CanActivateChildFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = await authService.waitForAuthReady();

  if (isAuthenticated) {
    router.navigate(['/app/home']);
    return false;
  }

  return true;
};
