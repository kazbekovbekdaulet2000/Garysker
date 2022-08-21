import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { ApplicationComponent } from './application/application.component';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { ResetPassStageOneComponent } from './reset-pass/stage-1/reset-pass-stage-1.component';
import { ResetPassStageTwoComponent } from './reset-pass/stage-2/reset-pass-stage-2.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
        canActivate: [AuthGuard]
      },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'application',
    component: ApplicationComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'reset',
    component: ResetPassStageOneComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reset/code',
    component: ResetPassStageTwoComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
