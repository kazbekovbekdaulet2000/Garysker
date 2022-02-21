import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ApplicationComponent } from './application/application.component';

import {AuthComponent} from './auth.component';
import { LoginComponent } from './login/login.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      },
    ]
  },
  {
    path: 'application',
    component: ApplicationComponent
  },
  {
    path: 'reset',
    component: ResetPassComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
