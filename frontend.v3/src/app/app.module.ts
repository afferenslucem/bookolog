import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeRu from '@angular/common/locales/ru';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { interceptors } from './main/app.interceptors';
import { InnerAreaComponent } from './main/components/inner-area/inner-area.component';
import { PreloaderComponent } from './main/components/preloader/preloader.component';
import { SideMenuComponent } from './main/components/side-menu/side-menu.component';
import { StartPageComponent } from './main/components/start-page/start-page.component';
import { SyncInfoComponent } from './main/components/sync-info/sync-info.component';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';
import { CollectionModule } from './modules/collection/collection.module';
import { NotificationModule } from './modules/notification/notification.module';
import { SettingsModule } from './modules/settings/settings.module';
import { StatisticModule } from './modules/statistic/statistic.module';
import { UiModule } from './modules/ui/ui.module';
import { UserModule } from './modules/user/user.module';

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    InnerAreaComponent,
    SideMenuComponent,
    PreloaderComponent,
    SyncInfoComponent,
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
    MatIconModule,
    UserModule,
    SettingsModule,
    NotificationModule,
    CollectionModule,
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
