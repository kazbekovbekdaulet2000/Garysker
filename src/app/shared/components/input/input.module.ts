import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { InputComponent } from './text/input.component';
import { SelectComponent } from './selections/select.component';
import { TextareaComponent } from './textarea/textarea.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { TypeaheadComponent } from './typeahead/typeahead.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { ruLocale, kkLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';

defineLocale('ru', ruLocale);
defineLocale('kk', kkLocale);

@NgModule({
  declarations: [
    InputComponent,
    SelectComponent,
    TextareaComponent,
    TypeaheadComponent,
    DatepickerComponent,
  ],
  exports: [
    InputComponent,
    SelectComponent,
    TextareaComponent,
    TypeaheadComponent,
    DatepickerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    TypeaheadModule,
    BsDatepickerModule,
  ],
})
export class InputModule {
}
