import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DobroAboutComponent } from './dobro/about/dobro-about.component';
import { DobroComponent } from './dobro/dobro.component';
import { EduComponent } from './edu/edu.component';
import { ReportModuleModule } from './edu/report-module/report-module.module';
import { VideoModuleModule } from './edu/video-module/video-module.module';

import { MainComponent } from './main.component';
import { MainProfileComponent } from './profile/profile.component';
import { QuestionsComponent } from './questions/questions.component';

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
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'edu',
        component: EduComponent
      },
      {
        path: 'edu/reports/:id',
        loadChildren: () => ReportModuleModule,
      },
      {
        path: 'edu/videos/:id',
        loadChildren: () => VideoModuleModule,
      },
      {
        path: 'questions',
        component: QuestionsComponent
      },
      {
        path: 'dobro',
        component: DobroComponent
      },
      {
        path: 'dobro/:id',   // надо в компоненты разделить 
        component: DobroAboutComponent
      },
      {
        path: 'profile',
        component: MainProfileComponent,
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
