import { Component, OnInit } from '@angular/core';
import { DialogConfirmModel } from '@core/services/modal.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './confirm-dialog-modal.component.html',
  styleUrls: ['./confirm-dialog-modal.component.scss'],
})
export class ConfirmDialogModalComponent implements OnInit {

  options: DialogConfirmModel;

  top: number = 0;
  bottom: number = 0;
  maxHeight: number = 200;

  constructor(
    private bsModalRef: BsModalRef,
  ) {
  }

  ngOnInit(): void {
    if (!this.options.confirmText) {
      this.options.confirmText = 'OK';
    }

    let modalContainer = document.getElementsByTagName('modal-container')[0]
    if (this.options.blur) {
      modalContainer.classList.add('modal-blur')
    }

    switch (this.options.position) {
      case 'center':
        this.bsModalRef.setClass('modal-dialog-centered');
        break;
    }
  }

  onClose(): void {
    this.bsModalRef.hide();
  }

  onConfirm(): void {
    this.onClose();

    if (this.options.onConfirm) {
      this.options.onConfirm();
    }
  }
  
  get getIcon() {
    return this.options.icon ? `assets/images/${this.options.icon}.png` : 'assets/images/stickers/sticker2.png'
  }
}
