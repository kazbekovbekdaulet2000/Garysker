import {NgModule} from '@angular/core';
import { DateRemainedPipe } from './date-remained.pipe';
import { ReadTimePipe } from './read-time.pipe';


@NgModule({
  declarations: [
    DateRemainedPipe,
    ReadTimePipe
  ],
  exports: [
    DateRemainedPipe,
    ReadTimePipe
  ],
  providers: [
    DateRemainedPipe,
    ReadTimePipe
  ]
})
export class DatePipeModule {
}
