import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { heightOutAnimation } from '@core/animations/height-out-animation';
import {  Store } from '@ngxs/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './card-success-modal.component.html',
  styleUrls: ['./card-success-modal.component.scss'],
  animations: [heightOutAnimation]
})
export class CardSuccessModalComponent {

  constructor(
    private bsModalRef: BsModalRef,
  ) {}

  onConfirm(): void {
    this.closeModal()
  }

  closeModal() {
    this.bsModalRef.hide()
  }
}
