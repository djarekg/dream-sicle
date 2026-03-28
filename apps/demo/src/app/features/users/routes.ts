import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./containers/users'),
  },
  {
    path: ':id',
    loadComponent: () => import('./containers/[id]/user'),
  },
] satisfies Routes;
