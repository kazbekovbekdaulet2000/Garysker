import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './profile-change-modal.component.html',
  styleUrls: ['./profile-change-modal.component.scss']
})
export class ProfileChangeModalComponent{
  
  constructor(
    private bsModalRef: BsModalRef
  ) { }

}
