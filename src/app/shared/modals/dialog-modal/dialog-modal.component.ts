import { Component, OnInit } from '@angular/core';
import { DialogModel } from '@core/services/modal.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.scss'],
})
export class DialogModalComponent implements OnInit {

  options: DialogModel;
  icon: string;

  constructor(
    private bsModalRef: BsModalRef,
  ) { }

  ngOnInit(): void {
    let modalContainer = document.getElementsByTagName('modal-container')[0]
    if (this.options.blur) {
      modalContainer.classList.add('modal-blur')
    }

    switch (this.options.position) {
      case 'center':
        this.bsModalRef.setClass('modal-dialog-centered');
        break;
    }
    if (this.options.iconType) {
      this.icon = `assets/images/stickers/${this.options.iconType}.png`
    }
  }

  onClose(): void {
    this.bsModalRef.hide();
  }

  onConfirm(){
    if (this.options.onConfirm) {
      this.options.onConfirm()
    }
    this.onClose()
  }
}
