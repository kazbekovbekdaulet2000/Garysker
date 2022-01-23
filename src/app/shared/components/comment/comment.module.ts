import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DatePipeModule } from "../../pipes/date/date-pipe.module";
import { CommentComponent } from "./comment.component";

@NgModule({
  declarations: [
    CommentComponent
  ],
  exports: [
    CommentComponent
  ],
  imports: [
    CommonModule,
    DatePipeModule
  ],
})
export class CommentModule {
}
