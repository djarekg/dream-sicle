import { Routes } from '@angular/router';

export default [
  {
    path: '',
    title: 'Home',
    loadComponent: () => import('@/features/home/home.component'),
  },
  {
    path: 'users',
    title: 'Users',
    loadChildren: () => import('@/features/users/routes'),
  },
  // {
  //   path: 'customers',
  //   title: 'Customers',
  //   loadChildren: () => import('@/features/customers/routes'),
  // },
  // {
  //   path: 'settings',
  //   title: 'Settings',
  //   loadChildren: () => import('@/features/settings/routes'),
  // },
  // {
  //   path: 'products',
  //   title: 'Products',
  //   loadChildren: () => import('@/features/products/routes'),
  // },
] satisfies Routes;
