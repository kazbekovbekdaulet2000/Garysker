import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApplicationModalComponent } from './modal/application-modal.component';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  modalRef!: BsModalRef;
  constructor(
    private bsService: BsModalService
  ) { }

  ngOnInit(): void {
  }

  openModal() {
    this.bsService.show(
      ApplicationModalComponent,
      {
        class: 'modal-lg modal-dialog-centered',
      })
  }

}
