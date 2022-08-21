import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './about-video.component.html',
  styleUrls: ['./about-video.component.scss'],
})
export class OverviewAboutVideoModalComponent {

  constructor(
    private bsModalRef: BsModalRef,
  ) { }

  closeModal(){
    this.bsModalRef.hide()
  }
}
