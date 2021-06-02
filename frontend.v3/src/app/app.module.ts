import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeRu from '@angular/common/locales/ru';
import { LOCALE_ID, NgModule } from '@angular/core';
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
import { UserModule } from './modules/user/user.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoggerWindowComponent } from './main/components/logger-window/logger-window.component';
import { FormattingModule } from './modules/formatting/formatting.module';
import { SearchModule } from './modules/search/search.module';
import { TitleModule } from './modules/title/title.module';
import { UiButtonModule, UiFormFieldModule, UiProgressBarModule, UiSideMenuModule, UiSpinnerModule, UiToolbarModule } from 'ui-kit';

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    InnerAreaComponent,
    SideMenuComponent,
    PreloaderComponent,
    SyncInfoComponent,
    LoggerWindowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    UiProgressBarModule,
    UiToolbarModule,
    UiFormFieldModule,
    UiSideMenuModule,
    UiButtonModule,
    UiSpinnerModule,
    HttpClientModule,
    AuthModule,
    BookModule,
    StatisticModule,
    UserModule,
    SettingsModule,
    NotificationModule,
    CollectionModule,
    NgbModule,
    FormattingModule,
    SearchModule,
    TitleModule,
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
export class AppModule {}
