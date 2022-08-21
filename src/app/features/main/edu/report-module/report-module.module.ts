import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportModuleRoutingModule } from './report-module-routing.module';
import { ReportComponent } from './report/report.component';
import { CommentModule } from 'src/app/shared/components/comment/comment.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { DatePipeModule } from 'src/app/shared/pipes/date/date-pipe.module';
import { SanitizerPipeModule } from 'src/app/shared/pipes/sanitizer/sanitizer-pipe.module';
import { ReportMenuComponent } from './report/menu/menu.component';
import { ReplyModule } from 'src/app/shared/components/reply/reply.module';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReportRelatedComponent } from './report/related/related.component';
import { LangPipeModule } from 'src/app/shared/pipes/lang/lang-pipe.module';
import { TranslateModule } from '@ngx-translate/core';
import { BackgroundImageModule } from 'src/app/shared/directives/background-image.module';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { CarouselModule } from 'src/app/shared/components/swiper/swiper.module';
import { SectionHeaderModule } from 'src/app/shared/components/section-header/section-header.module';
import { CommentsService } from '@core/services/comments.service';


@NgModule({
  declarations: [
    ReportComponent,
    ReportMenuComponent,
    ReportRelatedComponent,
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
    DatePipeModule,
    SanitizerPipeModule,
    BackgroundImageModule
  ],
  providers: [
    CommentsService.getProvider('reports')
  ]
})
export class ReportModuleModule { }
