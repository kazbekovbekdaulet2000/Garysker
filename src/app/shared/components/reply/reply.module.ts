import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { DatePipeModule } from "../../pipes/date/date-pipe.module";
import { ReplyComponent } from "./reply.component";

@NgModule({
  declarations: [
    ReplyComponent
  ],
  exports: [
    ReplyComponent
  ],
  imports: [
    CommonModule,
    DatePipeModule
  ],
})
export class ReplyModule {
}
