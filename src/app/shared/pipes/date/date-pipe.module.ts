import {NgModule} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DateAgePipe } from './date-age.pipe';
import { DateRemainedPipe } from './date-remained.pipe';
import { ReadTimePipe } from './read-time.pipe';


@NgModule({
  declarations: [
    DateRemainedPipe,
    ReadTimePipe,
    DateAgePipe
  ],
  exports: [
    DateRemainedPipe,
    ReadTimePipe,
    DateAgePipe
  ],
  providers: [
    DateRemainedPipe,
    ReadTimePipe,
    DateAgePipe
  ],
  imports: [
    TranslateModule
  ]
})
export class DatePipeModule {
}
