import { inject } from '@angular/core';

import { CanActivateFn, Router } from '@angular/router';

import { PermissionService } from '../services/permission.service';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route) => {
  const permissions = inject(PermissionService);
  const authService = inject(AuthService);
  const router = inject(Router);

  const module = route.data?.['module'] as string | undefined;

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  if (permissions.hasAccess(module)) {
    return true;
  }

  router.navigate(['/dashboard']);
  return false;
};
