import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  isDevMode,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
  withIncrementalHydration,
} from '@angular/platform-browser';

import { apiInterceptor } from '@/core/api/api.interceptor';
import { authInterceptor } from '@/core/auth/auth.interceptor';
import { AuthService } from '@/core/auth/auth.service';
import { provideOptionDefaults } from '@/core/options/defaults';

import { provideRouting } from './core/providers/router';

const hydrationProviders = isDevMode()
  ? []
  : [provideClientHydration(withIncrementalHydration(), withEventReplay())];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    ...hydrationProviders,
    provideHttpClient(
      withFetch(),
      withInterceptors([apiInterceptor, authInterceptor]),
    ),
    provideOptionDefaults(),
    provideRouting(),
    provideAppInitializer(() => {
      // On app initialization, refresh the authentication status.
      // This is necessary to ensure that the authentication status
      // is correct when the app is loaded/page refreshed.
      const service = inject(AuthService);
      return service.refresh();
    }),
  ],
};
