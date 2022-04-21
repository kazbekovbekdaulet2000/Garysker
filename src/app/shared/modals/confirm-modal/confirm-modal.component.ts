import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent implements OnInit {

  title: string = "";
  message: string = "";
  false_ans: string = "";
  true_ans: string = "";
  icon: string = "";
  onClose!: Subject<boolean | null>;

  constructor(
    private bsModalRef: BsModalRef,
  ) { }

  ngOnInit(): void {
    this.onClose = new Subject();
  }

  onConfirm(): void {
    this.onClose.next(true);
    this.closeModal()
  }

  onCancel(): void {
    this.onClose.next(false);
    this.closeModal()
  }

  closeModal() {
    this.bsModalRef.hide()
  }

  get getIcon(){
    return this.icon ? `assets/images/${this.icon}.png` : 'assets/images/err_sticker_2.png'
  }
}
