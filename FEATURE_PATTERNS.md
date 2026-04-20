# Feature Architecture Patterns - Dream Sicle

## Overview

This document outlines the established patterns and architecture used in the `products` and `customers` features, which can be replicated for new features like `customers`.

---

## 1. File Structure

### Standard Feature Directory Structure

```
features/
  [feature-name]/
    components/              # Presentation/dumb components
      [component-name]/
        [component-name].ts
        [component-name].html
        [component-name].css
    containers/              # Smart/container components
      [container-name]/
        [container-name].ts
        [container-name].html
        [container-name].css
      [id]/                   # Dynamic route for detail pages
        [entity].ts
        [entity].html
        [entity].css
    services/                 # Data access & business logic
      [entity].service.ts
    routes.ts                 # Lazy-loaded feature routes
```

### Example: Products Feature

```
products/
  components/
    product-cards/           # Presents array of products (dumb)
      product-cards.ts
      product-cards.html
      product-cards.css
    product-detail/          # Presents single product (dumb)
      product-detail.ts
      product-detail.html
      product-detail.css
  containers/
    products.ts              # Products list page (smart/container)
    products.html
    products.css
    [id]/
      product.ts             # Product detail page (smart/container)
      product.html
      product.css
  services/
    product.service.ts       # Data fetching & API calls
  routes.ts                  # Route configuration
```

### Alternative: Customers Feature (Simplified)

```
customers/
  containers/
    customers.ts             # Placeholder for list
    customers.html
    customers.css
    [id]/
      customer.ts            # Detail page
      customer.html
      customer.css
  routes.ts
```

---

## 2. Component Patterns

### Hierarchy

- **Container Components** (Smart): Handle data fetching, state management, and pass data to presentational components
- **Presentational Components** (Dumb): Receive data via inputs, emit events via outputs, focus on rendering UI

### Container Component Pattern

**Example: `products.ts`** (List Container)

```typescript
import { Component, computed, inject, resource, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Gender, ProductType } from '@ds/contracts';

import { ProductTypeSelect } from '@/components/select';
import { ProductCards } from '@/features/products/components/product-cards/product-cards';
import { ProductService } from '@/features/products/services/product.service';

@Component({
  selector: 'app-products',
  imports: [MatButtonToggleModule, MatToolbarModule, ProductTypeSelect, ProductCards],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export default class Products {
  readonly #service = inject(ProductService);

  // Use resource() for data fetching with auto-loading management
  readonly #resource = resource({
    defaultValue: [],
    loader: () => this.#service.getProducts(),
  });

  // Use signal() for filter/UI state
  protected readonly selectedType = signal<ProductType | null>(null);
  protected readonly selectedActive = signal<'ACTIVE' | 'INACTIVE' | 'ALL'>('ALL');

  // Use computed() for derived/filtered state
  protected readonly products = computed(() => {
    const value = this.#resource.value();
    const selectedActive = this.selectedActive();

    // Apply filters
    return value.filter(product => {
      if (selectedActive === 'ALL') return true;
      return selectedActive === 'ACTIVE' ? product.isActive : !product.isActive;
    });
  });

  // Expose loading state for templates
  protected get isLoading() {
    return this.#resource.isLoading;
  }
}
```

**Key Features:**

- Uses `resource()` for data fetching with built-in loading states
- Uses `signal()` for component-level state (filters, selections)
- Uses `computed()` for derived state (filtered results)
- Injects services and dependencies
- Marks as `default` export for lazy loading
- Uses `#private` fields for encapsulation

---

### Presentational Component Pattern

**Example: `product-cards.ts`** (Dumb Component)

```typescript
import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import type { ProductDto } from '@ds/contracts';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-cards',
  imports: [MatButtonModule, MatCardModule, RouterLink],
  templateUrl: './product-cards.html',
  styleUrl: './product-cards.css',
})
export class ProductCards {
  // Use input() for required data
  readonly products = input.required<ProductDto[]>();
}
```

**Key Features:**

- Receives data via `input()` (not decorators)
- No direct service access
- No state management
- Focused on rendering UI
- Named exports (not `default`)

---

### Detail/ID Container Pattern

**Example: `[id]/product.ts`** (Detail Page Container)

```typescript
import { Component, inject, resource, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isNotEmpty } from '@ds/utils';

import { Spinner } from '@/components/spinner/spinner';
import { ProductDetail } from '@/features/products/components/product-detail/product-detail';
import { ProductService } from '@/features/products/services/product.service';

@Component({
  selector: 'app-product',
  imports: [Spinner, ProductDetail],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export default class Product {
  readonly #route = inject(ActivatedRoute);
  readonly #service = inject(ProductService);

  // Store the ID from route params in a signal
  readonly #productId = signal<string | null>(null);

  // Resource with params dependency
  protected readonly resource = resource({
    params: () => this.#productId(), // Trigger reload when ID changes
    loader: ({ params: id }) => {
      if (isNotEmpty(id)) {
        return this.#service.getProduct(id);
      }
      return Promise.resolve(null);
    },
  });

  constructor() {
    // Subscribe to route params and update signal
    this.#route.paramMap.subscribe(params => {
      this.#productId.set(params.get('id'));
    });
  }
}
```

**Key Features:**

- Uses `resource()` with `params` dependency
- Subscribes to `ActivatedRoute.paramMap`
- Updates signal to trigger resource reload
- Handles loading states via resource
- Detail template shows spinner during loading

---

## 3. Service Patterns

### Standard Data Access Service

**Example: `product.service.ts`**

```typescript
import { inject, Injectable } from '@angular/core';
import type { ProductDto } from '@ds/contracts';

import { ApiService } from '@/core/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly #api = inject(ApiService);

  // Return promises (not observables) from API methods
  getProduct = (id: string) => this.#api.get<ProductDto>(`/products/${id}`);
  getProducts = () => this.#api.get<ProductDto[]>('/products');
}
```

**Key Features:**

- Marked as `@Injectable({ providedIn: 'root' })` for singleton
- Injects shared `ApiService`
- Methods return promises (not observables)
- Arrow function syntax for method definitions
- Private API field using `#private`

### User Service (with CRUD)

**Example: `user.service.ts`** (More complete example)

```typescript
import { inject, Injectable } from '@angular/core';
import type { UserDto } from '@ds/contracts';

import { ApiService } from '@/core/api/api.service';
import type { UserFormModel } from '@/features/users/forms/user-form.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly #api = inject(ApiService);

  getUser = (id: string) => this.#api.get<UserDto>(`/users/${id}`);
  getUsers = () => this.#api.get<UserDto[]>('/users');
  updateUser = (user: UserFormModel) => this.#api.post<UserFormModel>(`/users/${user.id}`, user);
  createUser = (user: UserFormModel) =>
    this.#api.put<UserFormModel, { id: string }>('/users', user);
  deleteUser = (id: string) => this.#api.delete<UserDto>(`/users/${id}`);
}
```

---

## 4. Core API Service

### ApiService Pattern

**Location:** `@/core/api/api.service.ts`

```typescript
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

type HttpOptions = {
  cache: RequestCache;
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly #http = inject(HttpClient);

  // GET with optional caching
  get<T>(url: string, options?: HttpOptions) {
    const { promise, resolve, reject } = Promise.withResolvers<T>();
    this.#http.get<T>(url, options).subscribe({
      next: data => resolve(data),
      error: err => reject(err),
    });
    return promise;
  }

  // POST - Generic request/response types
  post<V, R = unknown>(url: string, value?: V) {
    const { promise, resolve, reject } = Promise.withResolvers<R>();
    this.#http.post<R>(url, value).subscribe({
      next: data => resolve(data),
      error: err => reject(err),
    });
    return promise;
  }

  // PUT
  put<V, R = unknown>(url: string, value: V) {
    const { promise, resolve, reject } = Promise.withResolvers<R>();
    this.#http.put<R>(url, value).subscribe({
      next: data => resolve(data),
      error: err => reject(err),
    });
    return promise;
  }

  // DELETE
  delete<T>(url: string) {
    const { promise, resolve, reject } = Promise.withResolvers<T>();
    this.#http.delete<T>(url).subscribe({
      next: data => resolve(data),
      error: err => reject(err),
    });
    return promise;
  }
}
```

**Key Features:**

- Converts observables to promises
- Uses `Promise.withResolvers()` for promise handling
- Supports generic types for type safety
- Integrated with HTTP interceptor for API URL prefixing

### API Interceptor

**Location:** `@/core/api/api.interceptor.ts`

```typescript
export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith('/')) {
    const { apiUrl } = environment;
    req = req.clone({
      url: `${apiUrl}${req.url}`,
      mode: 'cors',
    });
  }
  return next(req);
};
```

---

## 5. Template/Style Approach

### Inline vs Separate Files

**Pattern Used: Separate Files**

- All templates use `templateUrl: './component-name.html'`
- All styles use `styleUrl: './component-name.css'` (note: singular, not `styleUrls`)
- Keeps templates and styles organized by component

### Modern Control Flow

**Templates use `@if`, `@for`, `@switch` instead of `*ngIf`, `*ngFor`**

**Example: `product-cards.html`**

```html
@for (product of products(); track product.id) {
<mat-card>
  <mat-card-header>
    <mat-card-title>{{ product.name }}</mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <p>{{ product.description }}</p>
  </mat-card-content>
  <mat-card-actions>
    <a
      [routerLink]="['/products', product.id]"
      mat-button>
      View Details
    </a>
  </mat-card-actions>
</mat-card>
}
```

### Defer Block Pattern

**Example: `[id]/product.html`** (For lazy loading with loading states)

```html
@defer (when resource.hasValue()) { @if (resource.value()) {
<app-product-detail [product]="resource.value()!" />
} } @loading (minimum 2s) {
<app-spinner />
}
```

### Style Organization

**Using CSS Grid and Flexbox**

- Components use `:host` selector for layout
- Material Design variables (`--mat-sys-*`)
- Responsive design with `grid-template-columns: repeat(auto-fill, minmax(...))`

**Example: `product-cards.css`**

```css
:host {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  grid-auto-rows: auto;
  gap: 1rem;
  align-items: stretch;
}

.mat-mdc-card:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease-in-out;
}
```

---

## 6. Shared Utilities & Components

### Shared Select Components

**Location:** `@/components/select/`

**Example: ProductTypeSelect**

```typescript
import { Component, input, model } from '@angular/core';
import { FormValueControl, ValidationError } from '@angular/forms/signals';
import { MatSelectModule } from '@angular/material/select';
import { ProductType } from '@ds/contracts';

@Component({
  selector: 'app-product-type-select',
  imports: [MatSelectModule],
  templateUrl: './product-type-select.html',
  styleUrl: './product-type-select.css',
})
export class ProductTypeSelect implements FormValueControl<ProductType | ProductType[] | null> {
  readonly value = model<ProductType | ProductType[] | null>(null);
  readonly errors = input<readonly ValidationError[]>([]);
  readonly multiple = input(false, { transform: coerceBooleanProperty });

  protected readonly productTypes = Object.keys(ProductType).map(key => ({
    key,
    value: key,
  }));

  onChange(value: ProductType | ProductType[] | null) {
    this.value.set(value);
  }
}
```

**Key Features:**

- Implements `FormValueControl` interface
- Uses `model()` for two-way binding
- Supports single and multi-select
- Generic and reusable

### Shared Utility Components

**Spinner Component Example**

```typescript
import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  imports: [MatProgressSpinnerModule],
  templateUrl: './spinner.html',
  styleUrl: './spinner.css',
})
export class Spinner {}
```

### Shared Utilities Library

**From `@ds/utils` package:**

- `isEmpty()`, `isNotEmpty()`
- `isNullOrUndefined()`, `isNotNullOrUndefined()`
- `formatDate()`, `formatPhoneNumber()`
- `debounce()`
- Cookie helpers: `setCookie()`, `getCookie()`, `deleteCookie()`
- Runtime checks: `isBrowser()`, `isServer()`, `isWebWorker()`

---

## 7. Routing Pattern

### Feature Routes Configuration

**Example: `routes.ts`**

```typescript
import { Routes } from '@angular/router';

export default [
  {
    path: '',
    data: {
      label: 'products',
      icon: 'inventory_2',
    },
    loadComponent: () => import('./containers/products'),
  },
  {
    path: ':id',
    data: {
      label: 'product',
      icon: 'package_2',
    },
    loadComponent: () => import('./containers/[id]/product'),
  },
] satisfies Routes;
```

**Key Features:**

- Lazy-loaded components with dynamic imports
- Metadata in route data (for breadcrumbs, navigation, icons, labels)
- Dynamic route parameters `:id`
- Standalone component routing (no NgModules)

---

## 8. Type Safety

### Using DTOs from Contracts Package

**From `@ds/contracts`:**

```typescript
import type { ProductDto } from '@ds/contracts';

// Services use DTOs for type safety
getProducts = () => this.#api.get<ProductDto[]>('/products');
```

**Example DTO:**

```typescript
export type ProductDto = {
  id: string;
  name: string;
  productType: ProductType;
  description: string;
  price: number;
  gender: Gender;
  isActive: boolean;
  dateCreated: string;
  dateUpdated: string;
};
```

---

## 9. Key Patterns Summary

### State Management

| Use Case        | Pattern              | Example               |
| --------------- | -------------------- | --------------------- |
| Data fetching   | `resource()`         | List containers       |
| Component state | `signal()`           | Filter selections     |
| Derived state   | `computed()`         | Filtered products     |
| Loading states  | `resource.isLoading` | Conditional rendering |

### Component Structure

| Layer          | Pattern                | Responsibility                  |
| -------------- | ---------------------- | ------------------------------- |
| Container      | Smart, resource-driven | Data fetching, filtering, state |
| Presentational | Dumb, input-driven     | UI rendering                    |
| Shared         | Reusable utilities     | Forms, selects, spinners        |

### Data Flow

```
Route → Container (load data) → Presentational (render) → User
                     ↓
                  Service (API calls)
                     ↓
                  ApiService (HTTP)
```

### API Calls

- Services return **promises** (not observables)
- ApiService converts observables to promises
- Components use `resource()` to manage async data

---

## 10. Replicating for New Features (e.g., Customers)

### Step 1: Create Directory Structure

```
features/customers/
  components/
    customer-list/
      customer-list.ts
      customer-list.html
      customer-list.css
    customer-detail/
      customer-detail.ts
      customer-detail.html
      customer-detail.css
  containers/
    customers.ts
    customers.html
    customers.css
    [id]/
      customer.ts
      customer.html
      customer.css
  services/
    customer.service.ts
  routes.ts
```

### Step 2: Create Service

```typescript
import { inject, Injectable } from '@angular/core';
import type { CustomerDto } from '@ds/contracts';

import { ApiService } from '@/core/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  readonly #api = inject(ApiService);

  getCustomer = (id: string) => this.#api.get<CustomerDto>(`/customers/${id}`);
  getCustomers = () => this.#api.get<CustomerDto[]>('/customers');
}
```

### Step 3: Create Container Component

```typescript
import { Component, computed, inject, resource, signal } from '@angular/core';

import { CustomerList } from '@/features/customers/components/customer-list/customer-list';
import { CustomerService } from '@/features/customers/services/customer.service';

@Component({
  selector: 'app-customers',
  imports: [CustomerList],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export default class Customers {
  readonly #service = inject(CustomerService);
  readonly #resource = resource({
    defaultValue: [],
    loader: () => this.#service.getCustomers(),
  });

  protected readonly customers = computed(() => this.#resource.value());
  protected get isLoading() {
    return this.#resource.isLoading;
  }
}
```

### Step 4: Create Presentational Components

```typescript
import { Component, input } from '@angular/core';
import type { CustomerDto } from '@ds/contracts';

@Component({
  selector: 'app-customer-list',
  imports: [...],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.css',
})
export class CustomerList {
  readonly customers = input.required<CustomerDto[]>();
}
```

### Step 5: Create Routes

```typescript
export default [
  {
    path: '',
    data: { label: 'Customers', icon: 'groups_3' },
    loadComponent: () => import('./containers/customers'),
  },
  {
    path: ':id',
    data: { label: 'Customer', icon: 'identity_platform' },
    loadComponent: () => import('./containers/[id]/customer'),
  },
];
```

---

## 11. Best Practices Applied

✅ **Standalone Components** - No NgModules
✅ **Signals** - Modern reactive state management
✅ **Lazy Loading** - Routes load components on demand
✅ **Type Safety** - DTOs, generics, strict types
✅ **Separation of Concerns** - Container/Presentational pattern
✅ **DI via `inject()`** - Modern dependency injection
✅ **Modern Control Flow** - `@if`, `@for`, `@defer` blocks
✅ **CSS Grid/Flexbox** - Responsive, modern styling
✅ **Promise-based APIs** - Consistent async handling
✅ **Material Design** - Consistent UI components

---

## 12. Files to Reference

- **Products Feature:** `apps/demo/src/app/features/products/`
- **API Service:** `apps/demo/src/app/core/api/api.service.ts`
- **Shared Components:** `apps/demo/src/app/components/`
- **Contracts/Types:** `packages/contracts/`
- **Utils:** `packages/utils/`
