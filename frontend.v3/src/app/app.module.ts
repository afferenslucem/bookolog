import { registerLocaleData } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StartPageComponent } from './main/components/start-page/start-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { interceptors } from './main/app.interceptors';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';
import localeRu from '@angular/common/locales/ru';
import { InnerAreaComponent } from './main/components/inner-area/inner-area.component';
import { StatisticModule } from './modules/statistic/statistic.module';
import { UiModule } from './modules/ui/ui.module';
import { SideMenuComponent } from './main/components/side-menu/side-menu.component';
import { PreloaderComponent } from './main/components/preloader/preloader.component';

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    InnerAreaComponent,
    SideMenuComponent,
    PreloaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    AuthModule,
    BookModule,
    StatisticModule,
    UiModule,
  ],
  providers: [
    interceptors,
    {
      provide: LOCALE_ID,
      useValue: 'ru',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
