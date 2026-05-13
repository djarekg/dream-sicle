import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  RedirectCommand,
  Router,
  withComponentInputBinding,
  withInMemoryScrolling,
  withNavigationErrorHandler,
  withPreloading,
  withRouterConfig,
  withViewTransitions,
} from '@angular/router';

import { authGuard } from '@/core/auth/auth.guard';

// const transitionCreated = new Subject<void>();

export const provideRouting = () =>
  provideRouter(
    [
      // The default route is protected and uses the protected-layout.
      {
        path: '',
        canActivateChild: [authGuard],
        loadComponent: () =>
          import('@/features/layout/protected-layout/protected-layout'),
        loadChildren: () => import('@/routes'),
      },
      {
        path: 'unprotected',
        loadComponent: () =>
          import('@/features/layout/unprotected-layout/unprotected-layout'),
        loadChildren: () => import('@/routes-unprotected'),
      },
    ],
    withInMemoryScrolling(),
    withRouterConfig({ canceledNavigationResolution: 'computed' }),
    withNavigationErrorHandler(({ error }) => {
      if (error instanceof HttpErrorResponse) {
        // TODO: Redirect to different pages on different response codes? (e.g. 500 page)
        return new RedirectCommand(inject(Router).parseUrl('/404'));
      }
      return void 0;
    }),
    withViewTransitions(/*{
    onViewTransitionCreated: ({ transition, to }) => {
      transitionCreated.next();
      const router = inject(Router);
      const toTree = createUrlTreeFromSnapshot(to, []);
      // Skip the transition if the only thing changing is the fragment and queryParams
      if (
        router.isActive(toTree, {
          paths: 'exact',
          matrixParams: 'exact',
          fragment: 'ignored',
          queryParams: 'ignored',
        })
      ) {
        transition.skipTransition();
      }
    },
  }*/
    ),
    withComponentInputBinding(),
    withPreloading(PreloadAllModules),
  );
