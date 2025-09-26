import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';

const appRoutes: Routes = [
  // Define your routes here, e.g., { path: '', component: HomeComponent }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes)
  ]
};