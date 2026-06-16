import { Injectable } from '@angular/core';

import { AuthService }
from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(
    private authService:
      AuthService
  ) {}

  hasAccess(
    module: string
  ): boolean {

    const user =
      this.authService
        .getCurrentUser();

    if (!user) {

      return false;

    }

    /*
      Administrador
      siempre tiene acceso total
    */

    if (
      user.role ===
      'Administrador'
    ) {

      return true;

    }

    /*
      Permisos individuales
    */

    return (
      user.permissions || []
    ).includes(
      module
    );

  }

}