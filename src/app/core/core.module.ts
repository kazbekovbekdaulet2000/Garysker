import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule, Meta } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './states/auth/auth.state';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './interceptors/loader.intercepter';
import { LoaderState } from './states/loader/loader.state';
import { RequestInterceptor } from './interceptors/request.intercepter';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { ModalModule } from 'ngx-bootstrap/modal'
import { PlyrModule } from 'ngx-plyr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { ScrollState } from './states/scroll/scroll.state';
import { TranslateModule } from '@ngx-translate/core';
import { AppState } from './states/app/app.state';
import { LangPipeModule } from '../shared/pipes/lang/lang-pipe.module';
import { ShopState } from '../features/main/shop/shop.state';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    LoaderComponent,
  ],
  exports: [
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PlyrModule,
    MatSliderModule,
    MatSidenavModule,
    NgxsModule.forRoot([AppState, AuthState, LoaderState, ScrollState, ShopState]),
    NgxsStoragePluginModule.forRoot({ key: ['auth', 'app', 'shop'] }),
    NgxsRouterPluginModule.forRoot(),
    ModalModule.forRoot(),
    LangPipeModule,
    TranslateModule.forRoot({
      defaultLanguage: 'ru'
    }),
  ],
  providers: [Meta],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: RequestInterceptor,
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoaderInterceptor,
          multi: true
        },
        AuthGuard,
      ]
    };
  }
}
