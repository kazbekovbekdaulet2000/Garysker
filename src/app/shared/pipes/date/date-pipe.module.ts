import {NgModule} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CourseTimePipe } from './course-time.pipe';
import { DateAgePipe } from './date-age.pipe';
import { DateRemainedPipe } from './date-remained.pipe';
import { ReadTimePipe } from './read-time.pipe';


@NgModule({
  declarations: [
    DateRemainedPipe,
    ReadTimePipe,
    DateAgePipe,
    CourseTimePipe
  ],
  exports: [
    DateRemainedPipe,
    ReadTimePipe,
    DateAgePipe,
    CourseTimePipe
  ],
  providers: [
    DateRemainedPipe,
    ReadTimePipe,
    DateAgePipe,
    CourseTimePipe
  ],
  imports: [
    TranslateModule
  ]
})
export class DatePipeModule {
}
