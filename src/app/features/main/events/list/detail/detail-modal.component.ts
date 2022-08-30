import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventModel } from '@core/models/api/event.model';
import { Store } from '@ngxs/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { ListEvents } from '../../events.actions';
import { EventDetailFormModalComponent } from './form/detail-modal-form.component';

@Component({
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss'],
})
export class EventDetailModalComponent implements OnInit {

  onClose: Subject<boolean | null>;

  event: EventModel
  type: string | null = null

  action: string | null | number = null

  constructor(
    private store: Store,
    private bsModalRef: BsModalRef,
    private bsModalService: BsModalService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.onClose = new Subject();
    if (this.action) {
      this.onPost()
    }
  }

  onConfirm(): void {
    this.onClose.next(true);
    this.closeModal()
  }

  onCancel(): void {
    this.onClose.next(false);
    this.closeModal()
    this.router.navigate(['edu'])
  }

  closeModal() {
    this.bsModalRef.hide()
  }

  onPost() {
    this.bsModalRef.hide()
    const modal = this.bsModalService.show(EventDetailFormModalComponent, {
      ignoreBackdropClick: true,
      initialState: {
        eventId: this.event.id
      },
      class: 'modal-dialog-centered'
    })

    modal.content?.onClose.subscribe((res) => {
      if (res) {
        this.bsModalService.show(EventDetailModalComponent, {
          class: 'modal-dialog-centered modal-lg',
          ignoreBackdropClick: true,
          initialState: {
            event: this.event,
            type: this.type
          }
        })
      } else {
        const params = this.type ? { time: this.type } : {}
        this.store.dispatch(new ListEvents(params))
      }
    });
  }

  saveAction() {
    localStorage.setItem('saved_event_add_action', `${this.event.id}`)
  }

  openLink(link: string) {
    if (link) {
      window.open(link, '_blank');
    }
  }

  get isPast(): boolean {
    var event_date = new Date(this.event.event_date);
    var today = new Date();
    return event_date < today
  }
}
