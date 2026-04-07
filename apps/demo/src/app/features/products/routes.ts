import { Routes } from '@angular/router';

export default [
  {
    path: '',
    data: {
      label: 'products',
      icon: 'inventory_2',
    },
    loadComponent: () => import('./containers/products.component'),
  },
  {
    path: ':id',
    data: {
      label: 'product',
      icon: 'package_2',
    },
    loadComponent: () => import('./containers/[id]/product.component'),
  },
] satisfies Routes;
