import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';

import { MainComponent } from './main.component';
import { NKOComponent } from './nko/nko.component';
import { ProfileComponent } from "./profile/profile.component";
import { QuestionsComponent } from './questions/questions.component';
import { SupportComponent } from './support/support.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'main'
      },
      {
        path: 'edu',
        loadChildren: () => import('./edu/edu.module').then(m => m.EduModule)
      },
      {
        path: 'projects',
        loadChildren: () => import('./projects/project.module').then(m => m.ProjectsModule)
      },
      {
        path: 'shop',
        loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)
      },
      {
        path: 'events',
        loadChildren: () => import('./events/events.module').then(m => m.EventsModule)
      },
      {
        path: 'main',
        loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule)
      }, 
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'nko',
        component: NKOComponent
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'support',
        component: SupportComponent
      },
      {
        path: 'questions',
        component: QuestionsComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
