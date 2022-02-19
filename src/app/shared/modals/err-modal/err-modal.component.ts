import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './err-modal.component.html',
  styleUrls: ['./err-modal.component.scss']
})
export class ErrorModalComponent implements OnInit {

  message: string = ""

  constructor(
    private bsModalRef: BsModalRef
  ) { }
  ngOnInit(): void {
    
  }

  closeModal() {
    this.bsModalRef.hide()
  }

}
