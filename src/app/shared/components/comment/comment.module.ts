import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { DatePipeModule } from "../../pipes/date/date-pipe.module";
import { InputModule } from "../input/input.module";
import { CommentComponent } from "./detail/comment.component";
import { CommentListComponent } from "./list/comment-list.component";

@NgModule({
  declarations: [
    CommentComponent,
    CommentListComponent
  ],
  exports: [
    CommentComponent,
    CommentListComponent
  ],
  imports: [
    CommonModule,
    DatePipeModule,
    TranslateModule,
    InputModule,
    ReactiveFormsModule
  ],
})
export class CommentModule {
}
