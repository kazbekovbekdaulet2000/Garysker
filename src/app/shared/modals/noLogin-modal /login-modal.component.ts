import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginErrModalComponent {
  
  constructor(
    private bsModalRef: BsModalRef,
    private route: Router
  ) { }

  closeModal(){
    this.bsModalRef.hide()
  }

  application(){
    this.route.navigate(['auth/application'])
    this.closeModal()
  }

  signIn(){
    this.route.navigate(['auth'])
    this.closeModal()
  }

}
