import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';

/**
 * Utility functions to determine if the current platform is the browser.
 */
export const isBrowser = () => isPlatformBrowser(inject(PLATFORM_ID));

/**
 * Utility functions to determine if the current platform is the server.
 */
export const isServer = () => isPlatformServer(inject(PLATFORM_ID));
