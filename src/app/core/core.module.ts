import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

import { NgxsModule } from '@ngxs/store';
import { AuthState } from './states/auth/auth.state';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SidebarState } from './states/sidebar/sidebar.state';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderInterceptor } from './interceptors/loader.intercepter';
import { LoaderState } from './states/loader/loader.state';
import { RequestInterceptor } from './interceptors/request.intercepter';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { ModalModule } from 'ngx-bootstrap/modal'
import { PlyrModule } from 'ngx-plyr';
@NgModule({
  declarations: [
    // HeaderComponent,
    // FooterComponent,
    LoaderComponent,
  ],
  exports: [
    // HeaderComponent,
    // FooterComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    HttpClientModule,
    PlyrModule,
    NgxsModule.forRoot([AuthState, SidebarState, LoaderState]),
    NgxsStoragePluginModule.forRoot({ key: ['auth'] }),
    NgxsRouterPluginModule.forRoot(),
    ModalModule.forRoot(),
  ],
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
        // AuthGuard,
        // RedirectGuard,
      ]
    };
  }
}
