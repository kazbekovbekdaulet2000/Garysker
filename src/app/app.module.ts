import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import localeKK from '@angular/common/locales/kk';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from '@core/components/header/header.component';
import { NotFoundComponent } from './features/notfound/notfound.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { SwiperModule } from "swiper/angular";
import { TranslateModule } from '@ngx-translate/core';
import { LangPipeModule } from './shared/pipes/lang/lang-pipe.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { providePerformance, getPerformance } from '@angular/fire/performance';
import { HeaderSearchComponent } from '@core/components/header/search/header-search.component';
import { HeaderProfileComponent } from '@core/components/header/profile/header-profile.component';
import { SidenavComponent } from '@core/components/sidenav/sidenav.component';
import { BackgroundImageModule } from './shared/directives/background-image.module';

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    HeaderSearchComponent,
    HeaderProfileComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatSliderModule,
    SwiperModule,
    MatSidenavModule,
    BackgroundImageModule,
    MatToolbarModule,
    LangPipeModule,
    TranslateModule,
    CoreModule.forRoot(),
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    providePerformance(() => getPerformance()),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
