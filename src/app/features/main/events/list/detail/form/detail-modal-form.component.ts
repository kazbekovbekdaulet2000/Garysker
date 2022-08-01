import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EventService } from '@core/services/event.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { MessageModalComponent } from 'src/app/shared/modals/err-modal/err-modal.component';

@Component({
  templateUrl: './detail-modal-form.component.html',
  styleUrls: ['./detail-modal-form.component.scss'],
})
export class EventDetailFormModalComponent implements OnInit {

  eventId: number = NaN

  formData = this.formBuilder.group({
    email: [null, Validators.required],
    name: [null, Validators.required],
    phone: [null, Validators.required]
  })

  onClose!: Subject<boolean | null>;

  constructor(
    private bsModalRef: BsModalRef,
    private eventService: EventService,
    private formBuilder: FormBuilder,
    private bsModalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.onClose = new Subject();
  }

  closeModal(choice: boolean) {
    this.bsModalRef.hide();
    this.onClose.next(choice);
  }

  onPost() {
    const payload = this.formData.getRawValue()
    payload.event = this.eventId
    this.eventService.participate(this.eventId, payload).subscribe(data => {
      this.bsModalService.show(MessageModalComponent, {
        initialState: { message: "events.register.apply.success", icon: 'sticker2' },
        class: 'modal-dialog-centered'
      })
      this.closeModal(false)
    }, err => {
      if(err.status !==400){
        this.bsModalService.show(MessageModalComponent, {
          initialState: { message: `events.register.apply.error` },
          class: 'modal-dialog-centered'
        })
        return
      }
      if (err.error.name) {
        this.bsModalService.show(MessageModalComponent, {
          initialState: { message: `Имя: ${err.error.name[0]}` },
          class: 'modal-dialog-centered'
        })
      }
      if (err.error.email) {
        this.bsModalService.show(MessageModalComponent, {
          initialState: { message: `Email: ${err.error.email[0]}` },
          class: 'modal-dialog-centered'
        })
      }
    })
  }

}
