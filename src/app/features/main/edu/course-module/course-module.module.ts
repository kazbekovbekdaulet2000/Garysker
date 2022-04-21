import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { DatePipeModule } from 'src/app/shared/pipes/date/date-pipe.module';
import { LangPipeModule } from 'src/app/shared/pipes/lang/lang-pipe.module';
import { TranslateModule } from '@ngx-translate/core';
import { CourseModuleRoutingModule } from './course-module-routing.module';
import { CourseState } from './course.state';
import { CourseComponent } from './course/course.component';
import { PlyrVideoPlayerModule } from 'src/app/shared/components/videoplayer/videoplayer.module';
import { RatingsService } from '@core/services/rating.service';
import { RatingsState } from '@core/states/ratings/ratings.state';
import { CourseProgressComponent } from './course/course-progress/course-progress.component';
import { CourseRatingComponent } from './course/course-progress/course-rating/course-rating.component';
import { InputModule } from 'src/app/shared/components/input/input.module';
import { LessonDetailComponent } from './course/lesson-detail/lesson-detail.component';
import { CourseDetailComponent } from './course/course-detail/course-detail.component';
import { CourseLessonTestComponent } from './course/lesson-detail/lesson-test/lesson-test.component';
import { CourseLessonTestQuestionComponent } from './course/lesson-detail/lesson-test/test-answer/lesson-test-answer.component';
import { LessonTest } from './course/lesson-detail/lesson-test/lesson-test.state';
import { BackgroundImageModule } from 'src/app/shared/directives/background-image.module';
import { FinishCourseModalComponent } from './course/lesson-detail/finish-modal/finish-modal.component';
import { PlyrModule } from 'ngx-plyr';

@NgModule({
  declarations: [
    CourseComponent,
    CourseDetailComponent,
    LessonDetailComponent,
    CourseProgressComponent,
    CourseRatingComponent,
    CourseLessonTestComponent,
    CourseLessonTestQuestionComponent,
    FinishCourseModalComponent
  ],
  imports: [
    CommonModule,
    CourseModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LangPipeModule,
    TranslateModule,
    InputModule,
    NgxsModule.forFeature([CourseState, LessonTest, RatingsState]),
    DatePipeModule,
    PlyrVideoPlayerModule,
    PlyrModule,
    BackgroundImageModule
  ],
  providers: [
    RatingsService.getProvider('courses')
  ]
})
export class CourseModuleModule { }
