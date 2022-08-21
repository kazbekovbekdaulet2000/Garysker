import {NgModule} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CourseTimePipe } from './course-time.pipe';
import { DateRemainedPipe } from './date-remained.pipe';
import { DurationPipe } from './duration.pipe';


@NgModule({
  declarations: [
    DateRemainedPipe,
    CourseTimePipe,
    DurationPipe
  ],
  exports: [
    DateRemainedPipe,
    CourseTimePipe,
    DurationPipe
  ],
  providers: [
    DateRemainedPipe,
    CourseTimePipe,
    DurationPipe
  ],
  imports: [
    TranslateModule
  ]
})
export class DatePipeModule {
}
