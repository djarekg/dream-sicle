import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink, type ActivatedRouteSnapshot } from '@angular/router';

type BreadcrumbType = {
  label: string;
  url: string;
  icon?: string;
};

@Component({
  selector: 'ds-breadcrumbs',
  imports: [MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css',
})
export class Breadcrumbs {
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly breadcrumbs = computed<BreadcrumbType[]>(() => {
    const nav = this.#router.currentNavigation(); // Trigger recomputation on navigation
    console.log('Current navigation:', nav);
    console.log('Activated route snapshot:', this.#route.snapshot);
    return this.#createBreadcrumbs(this.#route.snapshot);
  });

  #createBreadcrumbs(root: ActivatedRouteSnapshot): BreadcrumbType[] {
    const breadcrumbs: BreadcrumbType[] = [];
    let url = '';
    let route: ActivatedRouteSnapshot | null = root;

    while (route) {
      const { label, icon } = route.data;
      const path = route.url.map(segment => segment.path).join('/');

      // Ensure no duplicate slashes and trim trailing slash except root
      url = `${url}/${path}`.replace(/\/+/g, '/').replace(/^(.+)\/$/, '$1');

      // Only add breadcrumb if it has a label or is the root path, and avoid duplicates
      if ((label || url === '/') && !breadcrumbs.find(i => i.url === url)) {
        breadcrumbs.push({ label: label ?? 'home', url, icon: icon ?? 'home' });
      }

      route = route.firstChild;
    }

    // Return breadcrumbs only if there are more than one, otherwise return an empty array.
    // This prevents showing a single breadcrumb for the root path.
    return breadcrumbs.length > 1 ? breadcrumbs : [];
  }
}
