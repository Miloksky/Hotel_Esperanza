import { routes } from './app.routes';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD
import { HttpClient, provideHttpClient } from '@angular/common/http';
=======
import { provideHttpClient } from '@angular/common/http';

>>>>>>> a06ef57ad3e725d7fba7ed6906e9042d183d3faf

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(CommonModule, FormsModule)
  ]
};
