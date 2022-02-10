import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.scss']
})
export class LinkShareModalComponent implements OnInit {
  
  constructor(
    private bsModalRef: BsModalRef
  ) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.bsModalRef.hide()
  }

}
