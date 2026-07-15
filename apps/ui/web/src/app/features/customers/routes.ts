import { Routes } from '@angular/router';

export default [
  {
    path: '',
    data: {
      label: 'Customers',
      icon: 'groups_3',
    },
    loadComponent: () => import('./containers/customers'),
  },
  {
    path: ':id',
    data: {
      label: 'Customer',
      icon: 'identity_platform',
    },
    loadComponent: () => import('./containers/[id]/customer'),
  },
] satisfies Routes;
