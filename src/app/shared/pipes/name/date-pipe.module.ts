import {NgModule} from '@angular/core';
import { DateRemainedPipe } from './date-remained.pipe';


@NgModule({
  declarations: [
    DateRemainedPipe,
  ],
  exports: [
    DateRemainedPipe,
  ],
  providers: [
    DateRemainedPipe
  ]
})
export class DatePipeModule {
}
