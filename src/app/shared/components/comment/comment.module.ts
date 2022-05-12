import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { DatePipeModule } from "../../pipes/date/date-pipe.module";
import { InputModule } from "../input/input.module";
import { CommentComponent } from "./comment.component";

@NgModule({
  declarations: [
    CommentComponent,
  ],
  exports: [
    CommentComponent,
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
