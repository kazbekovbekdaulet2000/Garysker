import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevEnvGuard } from '@core/guards/dev.guard';
import { EduComponent } from './main-screen/edu.component';


const routes: Routes = [
  {
    path: '',
    component: EduComponent,
  },
  {
    path: 'reports',
    loadChildren: () => import('./report-module/report-module.module').then(m => m.ReportModuleModule),
  },
  {
    path: 'videos',
    loadChildren: () => import('./video-module/video-module.module').then(m => m.VideoModuleModule),
  },
  {
    path: 'courses',
    loadChildren: () => import('./course-module/course-module.module').then(m => m.CourseModuleModule),
    canLoad: [DevEnvGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EduRoutingModule {
}