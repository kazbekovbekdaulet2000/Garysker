import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './photo-modal.component.html',
  styleUrls: ['./photo-modal.component.scss'],
})
export class PhotoModalComponent {

  photo: string;

  constructor(
    private bsModalRef: BsModalRef,
  ) { }

  closeModal() {
    this.bsModalRef.hide()
  }
}
