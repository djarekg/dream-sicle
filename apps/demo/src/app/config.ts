import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  ApplicationConfig,
  isDevMode,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
  withIncrementalHydration,
} from '@angular/platform-browser';

import { apiInterceptor } from '@/core/api/api.interceptor';
import { authInterceptor } from '@/core/auth/auth.interceptor';
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
  ],
};
