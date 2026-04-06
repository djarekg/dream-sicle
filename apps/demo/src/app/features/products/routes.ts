import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./containers/products.component'),
  },
  {
    path: ':id',
    loadComponent: () => import('./containers/[id]/product.component'),
  },
] satisfies Routes;
