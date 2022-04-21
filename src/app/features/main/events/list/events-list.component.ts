import { Select, Store } from '@ngxs/store'
import { opacityAnimation } from '@core/animations/opacity-animation';
import { heightAnimation } from '@core/animations/height-animation';
import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { EventsState } from '../events.state';
import { Observable } from 'rxjs';
import { ListResponseModel } from '@core/models/api/list.model';
import { EventModel } from '@core/models/api/event.model';
import { ClearEvents, ListEvents } from '../events.actions';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from 'src/app/shared/modals/confirm-modal/confirm-modal.component';
import { EventDetailModalComponent } from './detail/detail-modal.component';

export interface EventType {
  id: number
  name: string,
  type?: string,
}

@Component({
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
  animations: [opacityAnimation, heightAnimation],
  encapsulation: ViewEncapsulation.None,
})
export class EventListComponent implements OnDestroy {

  @Select(EventsState.events) events$!: Observable<ListResponseModel<EventModel>>

  show_info: boolean = false;

  types: EventType[] = [
    {
      id: 1,
      name: 'events.types.future',
      type: 'future'
    },
    {
      id: 2,
      name: 'events.types.past',
      type: 'past'
    },
    {
      id: 3,
      name: 'events.types.all',
    },
    // {
    //   id: 4,
    //   name: 'events.types.my',
    // }
  ]

  selected_type: EventType = this.types[0]

  constructor(
    private store: Store,
    private bsModalService: BsModalService
  ) {
    const params = this.selected_type.type ? { time: this.selected_type.type } : {}
    this.store.dispatch(new ListEvents(params))
  }

  ngOnDestroy(): void {
    this.store.dispatch([ClearEvents])
  }

  onShow() {
    this.show_info = !this.show_info
  }

  onTypeSelect(type: EventType) {
    this.selected_type = type
    this.ngOnDestroy()
    const params = this.selected_type.type ? { time: this.selected_type.type } : {}
    this.store.dispatch(new ListEvents(params))
  }

  openLink(link: string) {
    if (!link) {
      return
    }
    const modal = this.bsModalService.show(ConfirmModalComponent, {
      initialState: {
        title: "",
        message: "app.link.redirect.title",
        false_ans: "app.link.redirect.false",
        true_ans: "app.link.redirect.true"
      },
      class: 'modal-dialog-centered'
    })

    modal.content!.onClose.subscribe(result => {
      if (result === true) {
        window.open(link, '_blank');
      }
    });
  }

  onDetail(event: EventModel) {
    this.bsModalService.show(EventDetailModalComponent, {
      class: 'modal-dialog-centered modal-lg',
      ignoreBackdropClick: true,
      initialState: {
        event: event,
        type: this.selected_type.type
      }
    })
  }

}
