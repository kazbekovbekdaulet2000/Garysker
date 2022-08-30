import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmDialogModalComponent } from 'src/app/shared/modals/confirm-dialog-modal/confirm-dialog-modal.component';
import { DialogModalComponent } from 'src/app/shared/modals/dialog-modal/dialog-modal.component';
import { PhotoModalComponent } from 'src/app/shared/modals/photo-modal/photo-modal.component';

export interface DialogModel {
  position: 'top' | 'center';
  title: string;
  message: string;
  icon?: string;
  blur?: boolean;
  iconType?: 'success' | 'hello' | 'congrats' | 'hope' | 'hello2' | 'not-found' | 'love' | 'error' | 'wow-face' | 'garyshker'
  onConfirm?: () => void;
}

export interface DialogConfirmModel extends DialogModel {
  confirmText?: string;
  cancelText?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private bsModalService: BsModalService
  ) { }

  showConfirmDialog(options: DialogConfirmModel) {
    this.bsModalService.show(ConfirmDialogModalComponent, { initialState: { options } });
  }

  showDialog(options: DialogModel) {
    this.bsModalService.show(DialogModalComponent, { initialState: { options } })
  }

  photoDialog(photo: string) {
    this.bsModalService.show(PhotoModalComponent, { initialState: { photo }, class: 'modal-dialog-centered' })
  }
}