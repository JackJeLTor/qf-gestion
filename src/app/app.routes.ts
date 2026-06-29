import { Routes } from '@angular/router';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'dashboard',
    canActivate: [roleGuard],
    data: { module: 'dashboard' },
    loadComponent: () =>
      import('./pages/dashboard/dashboard.page').then((m) => m.DashboardPage),
  },
  {
    path: 'reports',
    canActivate: [roleGuard],
    data: { module: 'reports' },
    loadComponent: () =>
      import('./pages/reports/reports.page').then((m) => m.ReportsPage),
  },
  {
    path: 'profile',
    canActivate: [roleGuard],
    data: { module: 'profile' },
    loadComponent: () =>
      import('./pages/profile/profile.page').then((m) => m.ProfilePage),
  },
  {
    path: 'prescriptions',
    canActivate: [roleGuard],
    data: { module: 'prescriptions' },
    loadComponent: () =>
      import('./pages/prescriptions/prescriptions.page').then((m) => m.PrescriptionsPage),
  },
  {
    path: 'productions',
    canActivate: [roleGuard],
    data: { module: 'productions' },
    loadComponent: () =>
      import('./pages/productions/productions.page').then((m) => m.ProductionsPage),
  },
  {
    path: 'raw-materials',
    canActivate: [roleGuard],
    data: { module: 'raw-materials' },
    loadComponent: () =>
      import('./pages/raw-materials/raw-materials.page').then((m) => m.RawMaterialsPage),
  },
  {
    path: 'quality-control',
    canActivate: [roleGuard],
    data: { module: 'quality-control' },
    loadComponent: () =>
      import('./pages/quality-control/quality-control.page').then((m) => m.QualityControlPage),
  },
  {
    path: 'laboratories',
    canActivate: [roleGuard],
    data: { module: 'laboratories' },
    loadComponent: () =>
      import('./pages/laboratories/laboratories.page').then((m) => m.LaboratoriesPage),
  },
  {
    path: 'delivery',
    canActivate: [roleGuard],
    data: { module: 'delivery' },
    loadComponent: () =>
      import('./pages/delivery/delivery.page').then((m) => m.DeliveriesPage),
  },
  {
    path: 'patients',
    canActivate: [roleGuard],
    data: { module: 'patients' },
    loadComponent: () =>
      import('./pages/patients/patients.page').then((m) => m.PatientsPage),
  },
  {
    path: 'doctors',
    canActivate: [roleGuard],
    data: { module: 'doctors' },
    loadComponent: () =>
      import('./pages/doctors/doctors.page').then((m) => m.DoctorsPage),
  },
  {
    path: 'production-consumption',
    canActivate: [roleGuard],
    data: { module: 'production-consumption' },
    loadComponent: () =>
      import('./pages/production-consumption/production-consumption.page').then(
        (m) => m.ProductionConsumptionPage,
      ),
  },
  {
    path: 'audit',
    canActivate: [roleGuard],
    data: { module: 'audit' },
    loadComponent: () =>
      import('./pages/audit/audit.page').then((m) => m.AuditPage),
  },
  {
    path: 'users',
    canActivate: [roleGuard],
    data: { module: 'users' },
    loadComponent: () =>
      import('./pages/users/users.page').then((m) => m.UsersPage),
  },
  {
    path: 'production-history/:id',
    canActivate: [roleGuard],
    data: { module: 'productions' },
    loadComponent: () =>
      import('./pages/production-history/production-history.page').then(
        (m) => m.ProductionHistoryPage,
      ),
  },
  {
    path: 'backup',
    canActivate: [roleGuard],
    data: { module: 'backup' },
    loadComponent: () =>
      import('./pages/backup/backup.page').then((m) => m.BackupPage),
  },
  {
    path: 'access-history',
    canActivate: [roleGuard],
    data: { module: 'access-history' },
    loadComponent: () =>
      import('./pages/access-history/access-history.page').then(
        (m) => m.AccessHistoryPage,
      ),
  },
];
