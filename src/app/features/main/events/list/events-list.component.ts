import { Select, Store } from '@ngxs/store'
import { opacityAnimation } from '@core/animations/opacity-animation';
import { heightAnimation } from '@core/animations/height-animation';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { EventsState } from '../events.state';
import { Observable } from 'rxjs';
import { ListResponseModel } from '@core/models/api/list.model';
import { EventModel } from '@core/models/api/event.model';
import { ClearEvents, ListEvents } from '../events.actions';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from 'src/app/shared/modals/confirm-modal/confirm-modal.component';
import { EventDetailModalComponent } from './detail/detail-modal.component';
import { EventService } from '@core/services/event.service';

export interface EventType {
  id: number
  name: string,
  type?: string,
}

@Component({
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
  animations: [opacityAnimation, heightAnimation],
})
export class EventListComponent implements OnDestroy, AfterViewInit {

  @Select(EventsState.events) events$!: Observable<ListResponseModel<EventModel>>

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
  ]

  selected_type: EventType = this.types[0]

  constructor(
    private store: Store,
    private bsModalService: BsModalService,
    private eventService: EventService
  ) {
    const params = this.selected_type.type ? { time: this.selected_type.type } : {}
    this.store.dispatch(new ListEvents(params))
  }

  ngAfterViewInit(): void {
    const eventId = Number(localStorage.getItem('saved_event_add_action'))
    if (eventId) {
      this.eventService.get(eventId).subscribe(event => {
        this.onDetail(event)
      })
      localStorage.removeItem('saved_event_add_action')
    }
    if (this.store.selectSnapshot(EventsState.events).count === 0) {
      this.selected_type = this.types[2]
      const params = {}
      this.store.dispatch(new ListEvents(params))
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch([ClearEvents])
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
        message: "app.link.redirect.title",
        false_ans: "app.link.redirect.false",
        true_ans: "app.link.redirect.true"
      },
      class: 'modal-dialog-centered',
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
      ignoreBackdropClick: !!event.video,
      initialState: {
        event: event,
        type: this.selected_type.type
      }
    })
  }

  isPast(event: EventModel): boolean {
    var event_date = new Date(event.event_date);
    var today = new Date();
    return event_date < today
  }

}
