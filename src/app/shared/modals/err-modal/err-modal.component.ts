import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './err-modal.component.html',
  styleUrls: ['./err-modal.component.scss']
})
export class MessageModalComponent {

  title: string = "";
  message: string = "";
  icon: string = ""

  constructor(
    private bsModalRef: BsModalRef
  ) { }

  closeModal() {
    this.bsModalRef.hide()
  }

  get getIcon() {
    return this.icon ? `assets/images/stickers/${this.icon}.png` : 'assets/images/stickers/sticker1.png'
  }
}
