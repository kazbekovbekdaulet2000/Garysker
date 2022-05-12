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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { SwiperModule } from "swiper/angular";
import { TranslateModule } from '@ngx-translate/core';
import { LangPipeModule } from './shared/pipes/lang/lang-pipe.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { providePerformance, getPerformance } from '@angular/fire/performance';

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatSliderModule,
    SwiperModule,
    MatSidenavModule,
    LangPipeModule,
    TranslateModule,
    CoreModule.forRoot(),
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    providePerformance(() => getPerformance()),
  ],
  providers: [
    // { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: LOCALE_ID, useValue: 'ru' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
