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


@NgModule({
  declarations: [
    ReportComponent,
    ReportMenuComponent,
  ],
  imports: [
    CommonModule,
    ReportModuleRoutingModule,
    CommentModule,
    FormsModule,
    ReplyModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([ReportState]),
    DatePipeModule,
    SanitizerPipeModule
  ]
})
export class ReportModuleModule { }
