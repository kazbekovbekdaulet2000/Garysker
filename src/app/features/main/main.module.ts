import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SideMenuComponent } from '@core/components/side-menu/side-menu.component';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { NgxsModule} from '@ngxs/store';
import { DatePipeModule } from 'src/app/shared/pipes/date/date-pipe.module';
import { FooterComponent } from '@core/components/footer/footer.component';
import { QuestionsComponent } from './questions/questions.component';
import { SanitizerPipeModule } from 'src/app/shared/pipes/sanitizer/sanitizer-pipe.module';
import { CommentModule } from 'src/app/shared/components/comment/comment.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxStickySidebarModule } from '@smip/ngx-sticky-sidebar';
import { ProfileComponent } from "./profile/profile.component";
import { ProfileChangeModalComponent } from './profile/profile-change-modal/profile-change-modal.component';
import { SupportComponent } from './support/support.component';
import { SwiperModule } from "swiper/angular";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AboutComponent } from './about/about.component';
import { NKOComponent } from './nko/nko.component';
import { TranslateModule } from '@ngx-translate/core';
import { LangPipeModule } from 'src/app/shared/pipes/lang/lang-pipe.module';
import { InputModule } from 'src/app/shared/components/input/input.module';
import { BsModalsTemplateModule } from 'src/app/shared/modals/modals.module';
import { VideoPlayerModule } from 'src/app/shared/components/videoplayer/videoplayer.module';
import { CarouselModule } from 'src/app/shared/components/swiper/swiper.module';
import { SectionHeaderModule } from 'src/app/shared/components/section-header/section-header.module';
import { ProfileReportsComponent } from './profile/reports/profile-reports.component';
import { ProfileVideosComponent } from './profile/videos/profile-videos.component';
import { ProfileCoursesComponent } from './profile/courses/profile-courses.component';

@NgModule({
  declarations: [
    MainComponent,
    SideMenuComponent,
    FooterComponent,
    QuestionsComponent,
    ProfileComponent,
    ProfileReportsComponent,
    ProfileVideosComponent,
    ProfileCoursesComponent,
    ProfileChangeModalComponent,
    SupportComponent,
    AboutComponent,
    NKOComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    CardModule,
    CommentModule,
    VideoPlayerModule,
    FormsModule,
    SwiperModule,
    InfiniteScrollModule,
    LangPipeModule,
    SectionHeaderModule,
    ReactiveFormsModule,
    TranslateModule,
    InputModule,
    BsModalsTemplateModule,
    NgxStickySidebarModule.withConfig({
      minWidth: 257
    }),
    CarouselModule,
    DatePipeModule,
    SanitizerPipeModule
  ],
})
export class MainModule {
}
