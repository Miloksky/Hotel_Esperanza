import { routes } from './app.routes';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom(CommonModule, FormsModule),
    provideHttpClient()
  ]
};
