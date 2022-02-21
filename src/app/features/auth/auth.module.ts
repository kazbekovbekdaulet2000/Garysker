import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicationComponent } from './application/application.component';
import { SignUpSectionComponent } from './application/group-pages/sign-up-section.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    ApplicationComponent,
    ResetPassComponent,
    SignUpSectionComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
})
export class AuthModule {
}
