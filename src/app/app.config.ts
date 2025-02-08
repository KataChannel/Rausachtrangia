import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthService } from './admin/users/auth/auth.service';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginatorIntl } from './shared/CustomPaginator';
import { IMAGE_CONFIG } from '@angular/common';
import { provideServiceWorker } from '@angular/service-worker';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UsersInterceptor } from './admin/users/auth/users.interceptor';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
export const appConfig: ApplicationConfig = {
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' }, // Ngôn ngữ tiếng Việt
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: UsersInterceptor, multi: true },
    provideZoneChangeDetection({ eventCoalescing: true }),  
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()), 
    provideAnimationsAsync(),
    provideClientHydration(),
    provideRouter(appRoutes),
    provideAnimations(),
    {
        provide: IMAGE_CONFIG,
        useValue: {
            disableImageSizeWarning: true,
            disableImageLazyLoadWarning: true
        }
    },
    AuthService,
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }, provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }),
  ],
};
