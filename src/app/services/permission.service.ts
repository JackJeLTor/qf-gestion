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

    switch (user.role) {

      case 'Administrador':
        return true;

      case 'Produccion':
        return [
          'productions',
          'raw-materials',
          'production-consumption',
          'production-materials'
        ].includes(module);

      case 'Calidad':
        return [
          'quality-control'
        ].includes(module);

      case 'Recepcion':
        return [
          'delivery'
        ].includes(module);

      case 'Medico':
        return [
          'prescriptions'
        ].includes(module);

      case 'Consulta':
        return [
          'dashboard',
          'reports'
        ].includes(module);

      default:
        return false;
    }

  }

}