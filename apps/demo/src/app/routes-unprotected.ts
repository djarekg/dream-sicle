import { Routes } from '@angular/router';

export default [
  {
    path: 'signin',
    title: 'Welcome to dream sicle',
    loadComponent: () => import('@/features/auth/signin/signin'),
  },
] satisfies Routes;
