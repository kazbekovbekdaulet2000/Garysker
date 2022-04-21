import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { CourseLessonTestComponent } from './course/lesson-detail/lesson-test/lesson-test.component';

const routes: Routes = [
  {
    path: ':id',
    component: CourseComponent,
    children: [
      {
        path: 'test',
        component: CourseLessonTestComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseModuleRoutingModule { }
