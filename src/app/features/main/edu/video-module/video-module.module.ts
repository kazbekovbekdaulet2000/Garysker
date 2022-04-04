import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoModuleRoutingModule } from './video-module-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { CommentModule } from 'src/app/shared/components/comment/comment.module';
import { DatePipeModule } from 'src/app/shared/pipes/date/date-pipe.module';
import { SanitizerPipeModule } from 'src/app/shared/pipes/sanitizer/sanitizer-pipe.module';
import { VideoState } from './video.state';
import { VideoComponent } from './video/video.component';
import { VideoCommentsComponent } from './video/comments/video-comments.component';
import { VideoDetailsComponent } from './video/details/video-details.component';
import { PlyrVideoPlayerModule } from 'src/app/shared/components/videoplayer/videoplayer.module';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { ReplyModule } from 'src/app/shared/components/reply/reply.module';
import { LangPipeModule } from 'src/app/shared/pipes/lang/lang-pipe.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    VideoComponent,
    VideoDetailsComponent,
    VideoCommentsComponent
  ],
  imports: [
    CommonModule,
    VideoModuleRoutingModule,
    CommentModule,
    FormsModule,
    CardModule,
    ReplyModule,
    ReactiveFormsModule,
    LangPipeModule,
    TranslateModule,
    NgxsModule.forFeature([VideoState]),
    DatePipeModule,
    SanitizerPipeModule,
    PlyrVideoPlayerModule,
  ]
})
export class VideoModuleModule { }
