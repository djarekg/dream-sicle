import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./containers/users.component'),
  },
  {
    path: ':id',
    loadComponent: () => import('./containers/[id]/user.component'),
  },
] satisfies Routes;
