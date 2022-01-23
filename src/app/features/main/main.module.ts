import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SideMenuComponent } from '@core/components/side-menu/side-menu.component';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { NgxsModule } from '@ngxs/store';
import { MainState } from './main.state';
import { EduComponent } from './edu/edu.component';
import { DatePipeModule } from 'src/app/shared/pipes/date/date-pipe.module';
import { DobroComponent } from './dobro/dobro.component';
import { DobroAboutComponent } from './dobro/about/dobro-about.component';
import { FooterComponent } from '@core/components/footer/footer.component';
import { ReportComponent } from './edu/report/report.component';
import { VideoComponent } from './edu/video/video.component';
import { QuestionsComponent } from './questions/questions.component';
import { SanitizerPipeModule } from 'src/app/shared/pipes/sanitizer/sanitizer-pipe.module';
import { CommentModule } from 'src/app/shared/components/comment/comment.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxStickySidebarModule } from '@smip/ngx-sticky-sidebar';
import { LinkShareModalComponent } from './edu/report/share-modal/share-modal.component';
import { LoginErrModalComponent } from './edu/report/noLogin-modal /login-modal.component';

@NgModule({
  declarations: [
    MainComponent,
    EduComponent,
    DobroComponent,
    SideMenuComponent,
    DobroAboutComponent,
    FooterComponent,
    ReportComponent,
    VideoComponent,
    QuestionsComponent,
    LinkShareModalComponent,
    LoginErrModalComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    CardModule,
    CommentModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStickySidebarModule,
    NgxsModule.forFeature([MainState]),
    DatePipeModule,
    SanitizerPipeModule
  ],
})
export class MainModule {
}
