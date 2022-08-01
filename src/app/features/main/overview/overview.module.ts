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

@NgModule({
  declarations: [
    ProjectOverviewComponent
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
  providers: []
})
export class OverviewModule {
}
