import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DobroAboutComponent } from './dobro/about/dobro-about.component';
import { DobroComponent } from './dobro/dobro.component';
import { EduComponent } from './edu/edu.component';
import { ReportComponent } from './edu/report/report.component';
import { VideoComponent } from './edu/video/video.component';

import { MainComponent } from './main.component';
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
        component: ReportComponent
      },
      {
        path: 'edu/videos/:id',
        component: VideoComponent
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
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
