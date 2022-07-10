import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { DatePipeModule } from 'src/app/shared/pipes/date/date-pipe.module';
import { SanitizerPipeModule } from 'src/app/shared/pipes/sanitizer/sanitizer-pipe.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TranslateModule } from '@ngx-translate/core';
import { LangPipeModule } from 'src/app/shared/pipes/lang/lang-pipe.module';
import { ComponentHeaderModule } from 'src/app/shared/components/component-header/component-header.module';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { ProjectsRoutingModule } from './project-routing.module';
import { ProjectsState } from './project.state';
import { ProjectsComponent } from './list/projects.component';
import { BackgroundImageModule } from 'src/app/shared/directives/background-image.module';
import { ProjectDetailComponent } from './detail/project-detail.component';
import { ProjectsService } from '@core/services/projects.service';
import { VideoPlayerModule } from 'src/app/shared/components/videoplayer/videoplayer.module';
import { PricePipeModule } from 'src/app/shared/pipes/price/price-pipe.module';
import { InputModule } from 'src/app/shared/components/input/input.module';

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectDetailComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    FormsModule,
    InfiniteScrollModule,
    LangPipeModule,
    ReactiveFormsModule,
    TranslateModule,
    BackgroundImageModule,
    ComponentHeaderModule,
    NgxsModule.forFeature([ProjectsState]),
    LoaderModule,
    DatePipeModule,
    SanitizerPipeModule,
    VideoPlayerModule,
    PricePipeModule,
    InputModule
  ],
  providers: [
    ProjectsService
  ]
})
export class ProjectsModule {
}
