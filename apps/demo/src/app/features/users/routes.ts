import { Routes } from '@angular/router';

export default [
  {
    path: '',
    data: {
      label: 'Users',
      icon: 'groups',
    },
    loadComponent: () => import('./containers/users'),
  },
  {
    path: ':id',
    data: {
      label: 'User',
      icon: 'person',
    },
    loadComponent: () => import('./containers/[id]/user'),
  },
] satisfies Routes;
