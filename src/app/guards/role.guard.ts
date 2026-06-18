import { inject } from '@angular/core';

import { CanActivateFn, Router } from '@angular/router';

import { PermissionService } from '../services/permission.service';

export const roleGuard: CanActivateFn = (route) => {
  const permissions = inject(PermissionService);

  const router = inject(Router);

  const module = route.data?.['module'];

  if (permissions.hasAccess(module)) {
    return true;
  }

  router.navigate(['/dashboard']);

  return false;
};
