import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { InputComponent } from './text/input.component';
import { SelectComponent } from './selections/select.component';
import { TextareaComponent } from './textarea/textarea.component';


@NgModule({
  declarations: [
    InputComponent,
    SelectComponent,
    TextareaComponent
  ],
  exports: [
    InputComponent,
    SelectComponent,
    TextareaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
  ],
})
export class InputModule {
}
