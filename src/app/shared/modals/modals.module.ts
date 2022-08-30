import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { MessageModalComponent } from './err-modal/err-modal.component';
import { LoginErrModalComponent } from './noLogin-modal /login-modal.component';
import { LinkShareModalComponent } from './share-modal/share-modal.component';
import { ConfirmDialogModalComponent } from './confirm-dialog-modal/confirm-dialog-modal.component';
import { DialogModalComponent } from './dialog-modal/dialog-modal.component';
import { PhotoModalComponent } from './photo-modal/photo-modal.component';
import { BackgroundImageModule } from '../directives/background-image.module';

@NgModule({
  declarations: [
    LinkShareModalComponent,
    LoginErrModalComponent,
    MessageModalComponent,
    ConfirmModalComponent,
    ConfirmDialogModalComponent,
    DialogModalComponent,
    PhotoModalComponent
  ],
  exports: [
    LinkShareModalComponent,
    LoginErrModalComponent,
    MessageModalComponent,
    ConfirmModalComponent,
    ConfirmDialogModalComponent,
    DialogModalComponent,
    PhotoModalComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    BackgroundImageModule,
  ],
})
export class BsModalsTemplateModule {
}
