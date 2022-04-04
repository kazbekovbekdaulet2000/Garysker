import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DatePipeModule } from "../../pipes/date/date-pipe.module";
import { LangPipeModule } from "../../pipes/lang/lang-pipe.module";
import { SanitizerPipeModule } from "../../pipes/sanitizer/sanitizer-pipe.module";
import { CardComponent } from "./report-card/report-card.component";
import { VideoCardComponent } from "./video-card/video-card.component";

@NgModule({
  declarations: [
    CardComponent,
    VideoCardComponent
  ],
  exports: [
    CardComponent,
    VideoCardComponent
  ],
  imports: [
    CommonModule,
    DatePipeModule,
    SanitizerPipeModule,
    LangPipeModule,
  ],
})
export class CardModule {
}