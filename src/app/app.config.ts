import { ApplicationConfig, importProvidersFrom, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthService } from './admin/users/auth/auth.service';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginatorIntl } from './shared/CustomPaginator';
import { IMAGE_CONFIG } from '@angular/common';
import { provideServiceWorker } from '@angular/service-worker';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
export const appConfig: ApplicationConfig = {
  providers: [
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
