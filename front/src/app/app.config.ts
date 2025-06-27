import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { AppRouting } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    AppRouting
  ]
};
