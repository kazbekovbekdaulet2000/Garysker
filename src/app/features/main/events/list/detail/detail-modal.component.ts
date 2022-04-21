import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventModel } from '@core/models/api/event.model';
import { EventService } from '@core/services/event.service';
import { RatingsService } from '@core/services/rating.service';
import { AuthState } from '@core/states/auth/auth.state';
import { Store } from '@ngxs/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subject } from 'rxjs';
import { MessageModalComponent } from 'src/app/shared/modals/err-modal/err-modal.component';
import { LoginErrModalComponent } from 'src/app/shared/modals/noLogin-modal /login-modal.component';
import { ClearEvents, ListEvents, ParticipateEvent } from '../../events.actions';

@Component({
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss'],
})
export class EventDetailModalComponent implements OnInit {

  onClose!: Subject<boolean | null>;

  event!: EventModel
  type: string | null = null

  constructor(
    private store: Store,
    private bsModalRef: BsModalRef,
    private bsModalService: BsModalService,
    private router: Router,
    private eventService: EventService
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
    this.router.navigate(['edu'])
  }

  closeModal() {
    this.bsModalRef.hide()
  }

  sendRating() {
  }

  onPost() {
    if (!!!this.store.selectSnapshot(AuthState.access)) {
      this.bsModalService.show(LoginErrModalComponent, {
        class: 'modal-dialog-centered'
      })
      return
    }
    this.eventService.participate(this.event.id).subscribe(
      data => {
        const message = data.bookmarked ? 'events.user_bookmarked' : 'events.user_removed'
        const sticker = data.bookmarked ? 'err_sticker_2' : 'err_sticker_1'
        this.closeModal()
        this.store.dispatch(ClearEvents)
        const params = this.type ? { time: this.type } : {}
        this.store.dispatch(new ListEvents(params))
        this.bsModalService.show(MessageModalComponent, {
          initialState: {
            icon: sticker,
            message: message,
          },
          class: 'modal-dialog-centered'
        })
      })
  }

  openLink(link: string) {
    if (link) {
      window.open(link, '_blank');
    }
  }
}
