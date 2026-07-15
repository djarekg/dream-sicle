import {
  DOCUMENT,
  InjectionToken,
  makeEnvironmentProviders,
} from '@angular/core';

// Providing window using injection token could increase testability and portability (i.e SSR don't have a real browser environment).
export const WINDOW = new InjectionToken<Window>('WINDOW');

// The project uses prerendering, to resolve issue: 'window is not defined', we should get window from DOCUMENT.
// As it is recommended here: https://github.com/angular/universal/blob/main/docs/gotchas.md#strategy-1-injection
function windowProvider(document: Document) {
  return document.defaultView;
}

export const provideWindow = () => {
  return makeEnvironmentProviders([
    {
      provide: WINDOW,
      useFactory: (document: Document) => windowProvider(document),
      deps: [DOCUMENT],
    },
  ]);
};
