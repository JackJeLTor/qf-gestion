import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then(
        (m) => m.LoginPage
      ),
  },

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.page').then(
        (m) => m.DashboardPage
      ),
  },

  {
    path: 'inventory',
    loadComponent: () =>
      import('./pages/inventory/inventory.page').then(
        (m) => m.InventoryPage
      ),
  },

  {
    path: 'products',
    loadComponent: () =>
      import('./pages/products/products.page').then(
        (m) => m.ProductsPage
      ),
  },

  {
    path: 'orders',
    loadComponent: () =>
      import('./pages/orders/orders.page').then(
        (m) => m.OrdersPage
      ),
  },

  {
    path: 'reports',
    loadComponent: () =>
      import('./pages/reports/reports.page').then(
        (m) => m.ReportsPage
      ),
  },

  {
  path: 'movements',
  loadComponent: () =>
    import(
      './pages/movements/movements.page'
    ).then(
      m => m.MovementsPage
    )
},

{
  path: 'profile',
  loadComponent: () =>
    import('./pages/profile/profile.page').then(
      (m) => m.ProfilePage
    ),
},

{
    path: 'prescriptions',
    loadComponent: () => import('./pages/prescriptions/prescriptions.page').then( m => m.PrescriptionsPage)
},

{
    path: 'productions',
    loadComponent: () => import('./pages/productions/productions.page').then( m => m.ProductionsPage)
},
  
  {
    path: 'raw-materials',
    loadComponent: () => import('./pages/raw-materials/raw-materials.page').then( m => m.RawMaterialsPage)
  },

];