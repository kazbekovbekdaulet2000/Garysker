import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportModuleRoutingModule } from './report-module-routing.module';
import { ReportComponent } from './report/report.component';
import { CommentModule } from 'src/app/shared/components/comment/comment.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { ReportState } from './report.state';
import { DatePipeModule } from 'src/app/shared/pipes/date/date-pipe.module';
import { SanitizerPipeModule } from 'src/app/shared/pipes/sanitizer/sanitizer-pipe.module';
import { ReportMenuComponent } from './report/menu/menu.component';
import { ReplyModule } from 'src/app/shared/components/reply/reply.module';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReportRelatedComponent } from './report/related/related.component';
import { ReportCommentsComponent } from './report/comments/comments.component';
import { LangPipeModule } from 'src/app/shared/pipes/lang/lang-pipe.module';
import { TranslateModule } from '@ngx-translate/core';
import { CommentsState } from '@core/states/comments/comments.state';
import { BackgroundImageModule } from 'src/app/shared/directives/background-image.module';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { CarouselModule } from 'src/app/shared/components/swiper/swiper.module';
import { ReportContentComponent } from './report/content/report-content.component';
import { SectionHeaderModule } from 'src/app/shared/components/section-header/section-header.module';
import { CommentsService2 } from '@core/services/comments-2.service';


@NgModule({
  declarations: [
    ReportComponent,
    ReportContentComponent,
    ReportMenuComponent,
    ReportRelatedComponent,
    ReportCommentsComponent,
  ],
  imports: [
    CommonModule,
    ReportModuleRoutingModule,
    CommentModule,
    FormsModule,
    ReplyModule,
    CardModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    CarouselModule,
    SectionHeaderModule,
    LangPipeModule,
    LoaderModule,
    TranslateModule,
    NgxsModule.forFeature([ReportState, CommentsState]),
    DatePipeModule,
    SanitizerPipeModule,
    BackgroundImageModule
  ],
  providers: [
    CommentsService2.getProvider('reports')
  ]
})
export class ReportModuleModule { }
