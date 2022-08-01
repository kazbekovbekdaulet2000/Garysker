import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject, timer } from 'rxjs';

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
  false_ans_background: string = "";
  true_ans_background: string = "";
  
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
    return this.icon ? `assets/images/${this.icon}.png` : 'assets/images/stickers/sticker2.png'
  }
}
