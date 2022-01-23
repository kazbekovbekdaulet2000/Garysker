import {NgModule} from '@angular/core';
import { SanitizerPipe } from './sanitizer.pipe';


@NgModule({
  declarations: [
    SanitizerPipe,
  ],
  exports: [
    SanitizerPipe,
  ],
  providers: [
    SanitizerPipe
  ]
})
export class SanitizerPipeModule {
}
