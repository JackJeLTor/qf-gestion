import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

export interface AppModulePermission {
  key: string;
  label: string;
  path?: string;
  icon?: string;
}

export const APP_MODULES: AppModulePermission[] = [
  { key: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: 'home-outline' },
  { key: 'patients', label: 'Pacientes', path: '/patients', icon: 'people-outline' },
  { key: 'doctors', label: 'Médicos', path: '/doctors', icon: 'medkit-outline' },
  { key: 'laboratories', label: 'Laboratorios', path: '/laboratories', icon: 'business-outline' },
  { key: 'raw-materials', label: 'Materias Primas', path: '/raw-materials', icon: 'flask-outline' },
  { key: 'production-consumption', label: 'Consumo MP', path: '/production-consumption', icon: 'beaker-outline' },
  { key: 'prescriptions', label: 'Recetas', path: '/prescriptions', icon: 'document-text-outline' },
  { key: 'productions', label: 'Producción', path: '/productions', icon: 'construct-outline' },
  { key: 'quality-control', label: 'Control de Calidad', path: '/quality-control', icon: 'checkmark-done-outline' },
  { key: 'delivery', label: 'Entregas', path: '/delivery', icon: 'car-outline' },
  { key: 'reports', label: 'Reportes', path: '/reports', icon: 'bar-chart-outline' },
  { key: 'audit', label: 'Auditoría', path: '/audit', icon: 'clipboard-outline' },
  { key: 'users', label: 'Usuarios', path: '/users', icon: 'person-add-outline' },
  { key: 'backup', label: 'Backup', path: '/backup', icon: 'cloud-upload-outline' },
  { key: 'access-history', label: 'Historial de Accesos', path: '/access-history', icon: 'lock-closed-outline' },
];

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(private authService: AuthService) {}

  getAssignableModules(): AppModulePermission[] {
    return APP_MODULES;
  }

  getModuleLabel(module: string): string {
    return APP_MODULES.find((item) => item.key === module)?.label || module;
  }

  getVisibleMenuItems(): AppModulePermission[] {
    return APP_MODULES.filter((item) => !!item.path && this.hasAccess(item.key));
  }

  hasAccess(module?: string): boolean {
    const user = this.authService.getCurrentUser();

    if (!user || user.active !== true || user.locked === true) {
      return false;
    }

    if (!module || module === 'dashboard' || module === 'profile') {
      return true;
    }

    if (user.role === 'Administrador') {
      return true;
    }

    return (user.permissions || []).includes(module);
  }
}
