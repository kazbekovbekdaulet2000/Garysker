import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipeModule } from 'src/app/shared/pipes/date/date-pipe.module';
import { SanitizerPipeModule } from 'src/app/shared/pipes/sanitizer/sanitizer-pipe.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TranslateModule } from '@ngx-translate/core';
import { LangPipeModule } from 'src/app/shared/pipes/lang/lang-pipe.module';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { BackgroundImageModule } from 'src/app/shared/directives/background-image.module';
import { VideoPlayerModule } from 'src/app/shared/components/videoplayer/videoplayer.module';
import { InputModule } from 'src/app/shared/components/input/input.module';
import { ProjectOverviewComponent } from './overview.component';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'src/app/shared/components/swiper/swiper.module';
import { ProjectOverviewEduComponent } from './edu/overview-edu.component';
import { ProjectOverviewProjectsComponent } from './projects/overview-projects.component';
import { ProjectOverviewShopComponent } from './shop/overview-shop.component';
import { ProjectOverviewTeamComponent } from './team/overview-team.component';
import { ProjectOverviewFAQComponent } from './faq/overview-faq.component';
import { ProjectOverviewEventsComponent } from './events/overview-events.component';
import { OverviewAboutVideoModalComponent } from './about-video/about-video.component';
import { ProjectsService } from '@core/services/projects.service';

@NgModule({
  declarations: [
    ProjectOverviewComponent,
    ProjectOverviewEduComponent,
    ProjectOverviewProjectsComponent,
    ProjectOverviewShopComponent,
    ProjectOverviewTeamComponent,
    ProjectOverviewFAQComponent,
    ProjectOverviewEventsComponent,
    OverviewAboutVideoModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InfiniteScrollModule,
    LangPipeModule,
    ReactiveFormsModule,
    TranslateModule,
    BackgroundImageModule,
    LoaderModule,
    DatePipeModule,
    CarouselModule,
    SanitizerPipeModule,
    VideoPlayerModule,
    InputModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProjectOverviewComponent
      }
    ])
  ],
  providers: [
    ProjectsService
  ]
})
export class OverviewModule {
}
