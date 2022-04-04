import {NgModule} from '@angular/core';
import { SanitizerLangPipe } from './sanitizer-lang.pipe';
import { SanitizerPipe } from './sanitizer.pipe';


@NgModule({
  declarations: [
    SanitizerPipe,
    SanitizerLangPipe
  ],
  exports: [
    SanitizerPipe,
    SanitizerLangPipe
  ],
  providers: [
    SanitizerPipe,
    SanitizerLangPipe
  ]
})
export class SanitizerPipeModule {
}
