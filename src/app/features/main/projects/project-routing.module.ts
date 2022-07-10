import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDetailComponent } from './detail/project-detail.component';
import { ProjectsComponent } from './list/projects.component';


const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent
  },
  {
    path: ':id',
    component: ProjectDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {
}
