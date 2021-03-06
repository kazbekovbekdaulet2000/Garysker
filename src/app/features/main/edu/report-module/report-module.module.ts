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


@NgModule({
  declarations: [
    ReportComponent,
    ReportMenuComponent,
    ReportRelatedComponent,
    ReportCommentsComponent
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
    LangPipeModule,
    TranslateModule,
    NgxsModule.forFeature([ReportState]),
    DatePipeModule,
    SanitizerPipeModule
  ]
})
export class ReportModuleModule { }
