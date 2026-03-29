import {
  BootstrapContext,
  bootstrapApplication,
} from '@angular/platform-browser';

import { App } from './app/app.component';
import { config } from './app/config.server';

const bootstrap = (context: BootstrapContext) =>
  bootstrapApplication(App, config, context);

export default bootstrap;
