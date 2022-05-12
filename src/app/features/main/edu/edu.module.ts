import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { NgxsModule } from '@ngxs/store';
import { EduComponent } from './main-screen/edu.component';
import { DatePipeModule } from 'src/app/shared/pipes/date/date-pipe.module';
import { SanitizerPipeModule } from 'src/app/shared/pipes/sanitizer/sanitizer-pipe.module';
import { CommentModule } from 'src/app/shared/components/comment/comment.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxStickySidebarModule } from '@smip/ngx-sticky-sidebar';
import { PlyrVideoPlayerModule } from 'src/app/shared/components/videoplayer/videoplayer.module';
import { VideoState } from './video-module/video.state';
import { ReportState } from './report-module/report.state';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { SwiperModule } from "swiper/angular";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { EduPopularComponent } from './main-screen/popular/popular.component';
import { TranslateModule } from '@ngx-translate/core';
import { LangPipeModule } from 'src/app/shared/pipes/lang/lang-pipe.module';
import { CourseState } from './course-module/course.state';
import { EduRoutingModule } from './edu-routing.module';
import { EduCousesComponent } from './main-screen/courses/courses.component';
import { EduReportsComponent } from './main-screen/reports/reports.component';
import { EduVideosComponent } from './main-screen/videos/videos.component';
import { RatingsService } from '@core/services/rating.service';
import { ComponentHeaderModule } from 'src/app/shared/components/component-header/component-header.module';

@NgModule({
  declarations: [
    EduComponent,
    EduPopularComponent,
    EduCousesComponent,
    EduReportsComponent,
    EduVideosComponent
  ],
  imports: [
    CommonModule,
    EduRoutingModule,
    CardModule,
    CommentModule,
    PlyrVideoPlayerModule,
    FormsModule,
    IvyCarouselModule,
    SwiperModule,
    InfiniteScrollModule,
    LangPipeModule,
    ReactiveFormsModule,
    ComponentHeaderModule,
    TranslateModule,
    NgxStickySidebarModule.withConfig({
      minWidth: 257
    }),
    NgxsModule.forFeature([ReportState, VideoState, CourseState]),
    DatePipeModule,
    SanitizerPipeModule
  ],
  providers: [
    RatingsService.getProvider('courses')
  ]
})
export class EduModule {
}
