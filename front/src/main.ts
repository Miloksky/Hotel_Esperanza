import { bootstrapApplication } from '@angular/platform-browser';
import { HomeComponent } from './app/home.component';
import { appConfig } from './app/home.config';

bootstrapApplication(HomeComponent, appConfig)
  .catch(err => console.error(err));
