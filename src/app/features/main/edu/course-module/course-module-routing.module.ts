import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { CourseLessonComponent } from './course/lesson/course-lesson.component';
import { CourseLessonQuizComponent } from './course/lesson/quiz/course-lesson-quiz.component';
import { CourseLessonTabsComponent } from './course/lesson/tabs/course-lesson-tabs.component';

const routes: Routes = [
  {
    path: ':id',
    component: CourseComponent,
    children: [
      {
        path: '',
        component: CourseLessonTabsComponent
      },
      {
        path: 'quiz',
        component: CourseLessonQuizComponent
      }
    ]
  },
  {
    path: ':id/current_lesson',
    component: CourseLessonComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseModuleRoutingModule { }
