import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { MessageModalComponent } from './err-modal/err-modal.component';
import { LoginErrModalComponent } from './noLogin-modal /login-modal.component';
import { LinkShareModalComponent } from './share-modal/share-modal.component';

@NgModule({
  declarations: [
    LinkShareModalComponent,
    LoginErrModalComponent,
    MessageModalComponent,
    ConfirmModalComponent
  ],
  exports: [
    LinkShareModalComponent,
    LoginErrModalComponent,
    MessageModalComponent,
    ConfirmModalComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
  ],
})
export class BsModalsTemplateModule {
}
