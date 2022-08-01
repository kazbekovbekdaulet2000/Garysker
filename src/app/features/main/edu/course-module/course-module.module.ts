import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipeModule } from 'src/app/shared/pipes/date/date-pipe.module';
import { LangPipeModule } from 'src/app/shared/pipes/lang/lang-pipe.module';
import { TranslateModule } from '@ngx-translate/core';
import { CourseModuleRoutingModule } from './course-module-routing.module';
import { CourseComponent } from './course/course.component';
import { RatingsService } from '@core/services/rating.service';
import { InputModule } from 'src/app/shared/components/input/input.module';
import { BackgroundImageModule } from 'src/app/shared/directives/background-image.module';
import { PlyrModule } from 'ngx-plyr';
import { VideoPlayerModule } from 'src/app/shared/components/videoplayer/videoplayer.module';
import { CourseTeaserComponent } from './course/teaser/course-teaser.component';
import { CourseLessonComponent } from './course/lesson/course-lesson.component';
import { CourseLessonListComponent } from './course/lesson/list/course-lesson-list.component';
import { CourseLessonTabsComponent } from './course/lesson/tabs/course-lesson-tabs.component';
import { CourseLectorCardComponent } from './course/lector-card/course-lector-card.component';
import { CourseLessonQuizComponent } from './course/lesson/quiz/course-lesson-quiz.component';

@NgModule({
  declarations: [
    CourseComponent,
    CourseTeaserComponent,
    CourseLessonComponent,
    CourseLessonTabsComponent,
    CourseLessonQuizComponent,
    CourseLessonListComponent,
    CourseLectorCardComponent
  ],
  imports: [
    CommonModule,
    CourseModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LangPipeModule,
    TranslateModule,
    InputModule,
    DatePipeModule,
    VideoPlayerModule,
    PlyrModule,
    BackgroundImageModule
  ],
  providers: [
    RatingsService.getProvider('courses')
  ]
})
export class CourseModuleModule { }
