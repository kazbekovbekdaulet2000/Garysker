import {NgModule} from '@angular/core';
import { LangCategoryImagePipe } from './lang-category-image.pipe';
import { LangCategoryPipe } from './lang-category.pipe';
import { LangTextPipe } from './lang-text.pipe';


@NgModule({
  declarations: [
    LangTextPipe,
    LangCategoryPipe,
    LangCategoryImagePipe
  ],
  exports: [
    LangTextPipe,
    LangCategoryPipe,
    LangCategoryImagePipe
  ],
  providers: [
    LangTextPipe,
    LangCategoryPipe,
    LangCategoryImagePipe
  ]
})
export class LangPipeModule {
}
