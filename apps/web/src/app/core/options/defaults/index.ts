import {
  EnvironmentProviders,
  importProvidersFrom,
  makeEnvironmentProviders,
} from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';

import { MAT_FORM_FIELDS } from './mat-form-field.js';
import { MAT_ICON } from './mat-icon.js';

export const provideOptionDefaults = (): EnvironmentProviders => {
  return makeEnvironmentProviders([
    importProvidersFrom(MatNativeDateModule),
    MAT_FORM_FIELDS,
    MAT_ICON,
  ]);
};
