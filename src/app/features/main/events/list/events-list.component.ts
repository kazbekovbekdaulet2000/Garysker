import { Select, Store } from '@ngxs/store'
import { opacityAnimation } from '@core/animations/opacity-animation';
import { heightAnimation } from '@core/animations/height-animation';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { EventsState } from '../events.state';
import { Observable, of } from 'rxjs';
import { emptyListResponse, ListResponseModel } from '@core/models/api/list.model';
import { EventModel } from '@core/models/api/event.model';
import { ClearEvents, ListEvents } from '../events.actions';
import { BsModalService } from 'ngx-bootstrap/modal';
import { EventDetailModalComponent } from './detail/detail-modal.component';
import { EventService } from '@core/services/event.service';
import { ModalService } from '@core/services/modal.service';
import { filter } from 'rxjs/operators';

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

  @Select(EventsState.events) events$: Observable<ListResponseModel<EventModel>>

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

  selected_type: EventType = this.types[2]

  constructor(
    private store: Store,
    private bsModalService: BsModalService,
    private modalService: ModalService,
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
    this.events$.pipe(filter(list => list !== emptyListResponse)).subscribe(list => {
      if (list.count === 0) {
        this.modalService.showDialog({
          position: 'center',
          title: 'events.empty_list',
          message: '',
          iconType: "not-found",
          blur: true
        })
        this.onTypeSelect(this.types[2])
      }
    })
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
