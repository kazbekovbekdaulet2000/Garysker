import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SideMenuComponent } from '@core/components/side-menu/side-menu.component';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { NgxsModule, Store } from '@ngxs/store';
import { MainState } from './main.state';
import { EduComponent } from './edu/edu.component';
import { DatePipeModule } from 'src/app/shared/pipes/date/date-pipe.module';
import { DobroComponent } from './dobro/dobro.component';
import { DobroAboutComponent } from './dobro/about/dobro-about.component';
import { FooterComponent } from '@core/components/footer/footer.component';
import { QuestionsComponent } from './questions/questions.component';
import { SanitizerPipeModule } from 'src/app/shared/pipes/sanitizer/sanitizer-pipe.module';
import { CommentModule } from 'src/app/shared/components/comment/comment.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxStickySidebarModule } from '@smip/ngx-sticky-sidebar';
import { LinkShareModalComponent } from '../../shared/modals/share-modal/share-modal.component';
import { LoginErrModalComponent } from '../../shared/modals/noLogin-modal /login-modal.component';
import { ProfileComponent } from './profile/profile.component';
import { PlyrVideoPlayerModule } from 'src/app/shared/components/videoplayer/videoplayer.module';
import { VideoState } from './edu/video-module/video.state';
import { ReportState } from './edu/report-module/report.state';
import { ProfileChangeModalComponent } from './profile/profile-change-modal/profile-change-modal.component';
import { ProductsComponent } from './products/products.component';
import { ShopComponent } from './shop/shop.component';
import { EventsComponent } from './events/events.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { SupportComponent } from './support/support.component';
import { SwiperModule } from "swiper/angular";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { EduPopularComponent } from './edu/popular/popular.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    MainComponent,
    EduComponent,
    EduPopularComponent,
    DobroComponent,
    SideMenuComponent,
    DobroAboutComponent,
    FooterComponent,
    QuestionsComponent,
    LinkShareModalComponent,
    LoginErrModalComponent,
    ProfileComponent,
    ProfileChangeModalComponent,
    ProductsComponent,
    ShopComponent,
    EventsComponent,
    SupportComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    CardModule,
    CommentModule,
    PlyrVideoPlayerModule,
    FormsModule,
    IvyCarouselModule,
    SwiperModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    NgxStickySidebarModule.withConfig({
      minWidth: 257
    }),
    NgxsModule.forFeature([MainState, ReportState, VideoState]),
    DatePipeModule,
    SanitizerPipeModule
  ]
})
export class MainModule {
}
