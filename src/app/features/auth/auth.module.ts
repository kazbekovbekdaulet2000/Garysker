import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicationComponent } from './application/application.component';
import { SignUpSectionComponent } from './application/group-pages/sign-up-section.component';
import { ResetPassStageOneComponent } from './reset-pass/stage-1/reset-pass-stage-1.component';
import { ResetPassStageTwoComponent } from './reset-pass/stage-2/reset-pass-stage-2.component';
import { TranslateModule } from '@ngx-translate/core';
import { InputModule } from 'src/app/shared/components/input/input.module';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    ApplicationComponent,
    ResetPassStageOneComponent,
    ResetPassStageTwoComponent,
    SignUpSectionComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    InputModule,
    ReactiveFormsModule,
    TranslateModule,
    NgxMaskModule.forRoot(),
  ],
})
export class AuthModule {
}
