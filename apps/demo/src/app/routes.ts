import { Routes } from '@angular/router';

export default [
  {
    path: '',
    title: 'Home',
    data: {
      label: 'home',
      icon: 'home',
    },
    loadComponent: () => import('@/features/home/home'),
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
  {
    path: 'customers',
    title: 'Customers',
    data: {
      label: 'Customers',
      icon: 'groups_3',
    },
    loadChildren: () => import('@/features/customers/routes'),
  },
] satisfies Routes;
