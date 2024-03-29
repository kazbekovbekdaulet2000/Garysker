import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { EduComponent } from './main-screen/edu.component';
import { DatePipeModule } from 'src/app/shared/pipes/date/date-pipe.module';
import { SanitizerPipeModule } from 'src/app/shared/pipes/sanitizer/sanitizer-pipe.module';
import { CommentModule } from 'src/app/shared/components/comment/comment.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { SwiperModule } from "swiper/angular";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { EduPopularComponent } from './main-screen/popular/popular.component';
import { TranslateModule } from '@ngx-translate/core';
import { LangPipeModule } from 'src/app/shared/pipes/lang/lang-pipe.module';
import { EduRoutingModule } from './edu-routing.module';
import { EduCousesComponent } from './main-screen/courses/courses.component';
import { EduReportsComponent } from './main-screen/reports/reports.component';
import { EduVideosComponent } from './main-screen/videos/videos.component';
import { RatingsService } from '@core/services/rating.service';
import { ComponentHeaderModule } from 'src/app/shared/components/component-header/component-header.module';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { CarouselModule } from 'src/app/shared/components/swiper/swiper.module';
import { BackgroundImageModule } from 'src/app/shared/directives/background-image.module';
import { EllipsisModule } from 'ngx-ellipsis';
import { SectionHeaderModule } from 'src/app/shared/components/section-header/section-header.module';
import { DevEnvGuard } from '@core/guards/dev.guard';

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
    FormsModule,
    IvyCarouselModule,
    SwiperModule,
    InfiniteScrollModule,
    LangPipeModule,
    LoaderModule,
    CarouselModule,
    EllipsisModule,
    SectionHeaderModule,
    BackgroundImageModule,
    ReactiveFormsModule,
    ComponentHeaderModule,
    TranslateModule,
    DatePipeModule,
    SanitizerPipeModule
  ],
  providers: [
    DevEnvGuard,
    RatingsService.getProvider('courses')
  ]
})
export class EduModule {
}
