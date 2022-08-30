import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoModuleRoutingModule } from './video-module-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentModule } from 'src/app/shared/components/comment/comment.module';
import { DatePipeModule } from 'src/app/shared/pipes/date/date-pipe.module';
import { SanitizerPipeModule } from 'src/app/shared/pipes/sanitizer/sanitizer-pipe.module';
import { VideoComponent } from './video/video.component';
import { VideoDetailsComponent } from './video/details/video-details.component';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { LangPipeModule } from 'src/app/shared/pipes/lang/lang-pipe.module';
import { TranslateModule } from '@ngx-translate/core';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { VideoPlayerModule } from 'src/app/shared/components/videoplayer/videoplayer.module';
import { CommentsService } from '@core/services/comments.service';
import { BackgroundImageModule } from 'src/app/shared/directives/background-image.module';
import { VideoRelatedComponent } from './video/related/video-related.component';

@NgModule({
  declarations: [
    VideoComponent,
    VideoDetailsComponent,
    VideoRelatedComponent,
  ],
  imports: [
    CommonModule,
    VideoModuleRoutingModule,
    CommentModule,
    FormsModule,
    CardModule,
    ReactiveFormsModule,
    LangPipeModule,
    TranslateModule,
    BackgroundImageModule,
    LoaderModule,
    VideoPlayerModule,
    DatePipeModule,
    SanitizerPipeModule,
  ],
  providers: [
    CommentsService.getProvider('videos')
  ]
})
export class VideoModuleModule { }
