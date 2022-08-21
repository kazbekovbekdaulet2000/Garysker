import {NgModule} from '@angular/core';
import { LangCategoryImagePipe } from './lang-category-image.pipe';
import { LangCategoryPipe } from './lang-category.pipe';
import { LangMonthPipe } from './lang-month.pipe';
import { LangTextPipe } from './lang-text.pipe';


@NgModule({
  declarations: [
    LangTextPipe,
    LangCategoryPipe,
    LangCategoryImagePipe,
    LangMonthPipe
  ],
  exports: [
    LangTextPipe,
    LangCategoryPipe,
    LangCategoryImagePipe,
    LangMonthPipe
  ],
  providers: [
    LangTextPipe,
    LangCategoryPipe,
    LangCategoryImagePipe,
    LangMonthPipe
  ]
})
export class LangPipeModule {
}
