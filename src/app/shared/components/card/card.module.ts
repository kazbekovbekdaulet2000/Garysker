import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DatePipeModule } from "../../pipes/date/date-pipe.module";
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
    DatePipeModule
  ],
})
export class CardModule {
}