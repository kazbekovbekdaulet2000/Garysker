import {NgModule} from '@angular/core';
import { CategoryNamePipe } from './category-name.pipe';


@NgModule({
  declarations: [
    CategoryNamePipe
  ],
  exports: [
    CategoryNamePipe
  ],
  providers: [
    CategoryNamePipe
  ]
})
export class NamePipeModule {
}
