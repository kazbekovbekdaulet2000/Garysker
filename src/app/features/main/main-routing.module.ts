import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DobroAboutComponent } from './dobro/about/dobro-about.component';
import { DobroComponent } from './dobro/dobro.component';
import { EduComponent } from './edu/edu.component';

import { MainComponent } from './main.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'edu'
      },
      {
        path: 'edu',
        component: EduComponent
      },
      {
        path: 'dobro',
        component: DobroComponent
      },
      {
        path: 'dobro/:id',   // надо в компоненты разделить 
        component: DobroAboutComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
