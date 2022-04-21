import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Clipboard } from '@angular/cdk/clipboard';
import { opacityAnimation } from '@core/animations/opacity-animation';

@Component({
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.scss'],
  animations: [opacityAnimation]
})
export class LinkShareModalComponent {

  constructor(
    private bsModalRef: BsModalRef,
    private clipboard: Clipboard
  ) { }

  copied: boolean = false;
  location: string = window.location.href

  closeModal() {
    this.bsModalRef.hide()
  }

  copy() {
    const link = window.location.href
    this.clipboard.copy(link)
    this.copied = true
    setTimeout(() => {
      this.copied = false
    }, 1500)
    setTimeout(() => {
      this.closeModal()
    }, 1000)
  }

}
