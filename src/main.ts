// Import Zone.js required by Angular
import 'zone.js';

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Import your custom HTTP interceptor
import { HttpErrorInterceptor } from './app/interceptors/http-error.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    importProvidersFrom(BrowserAnimationsModule)
  ]
}).catch(err => console.error(err));