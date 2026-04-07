import { Routes } from '@angular/router';

export default [
  {
    path: '',
    title: 'Home',
    data: {
      label: 'home',
      icon: 'home',
    },
    loadComponent: () => import('@/features/home/home.component'),
  },
  {
    path: 'users',
    title: 'Users',
    data: {
      label: 'users',
      icon: 'group',
    },
    loadChildren: () => import('@/features/users/routes'),
  },
  {
    path: 'products',
    title: 'Products',
    data: {
      label: 'products',
      icon: 'inventory_2',
    },
    loadChildren: () => import('@/features/products/routes'),
  },
  // {
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
