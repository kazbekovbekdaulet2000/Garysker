import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './application-modal.component.html',
  styleUrls: ['./application-modal.component.scss']
})
export class ApplicationModalComponent implements OnInit {
  
  constructor(
    private bsModalRef: BsModalRef
  ) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.bsModalRef.hide()
  }

}
