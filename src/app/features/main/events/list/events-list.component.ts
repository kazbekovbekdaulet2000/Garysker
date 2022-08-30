import { opacityAnimation } from '@core/animations/opacity-animation';
import { heightAnimation } from '@core/animations/height-animation';
import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { emptyListResponse, ListResponseModel } from '@core/models/api/list.model';
import { EventModel } from '@core/models/api/event.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { EventDetailModalComponent } from './detail/detail-modal.component';
import { EventService } from '@core/services/event.service';
import { ModalService } from '@core/services/modal.service';

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
export class EventListComponent implements OnDestroy {

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

  selected_type$: BehaviorSubject<EventType> = new BehaviorSubject(this.types[2])

  events: ListResponseModel<EventModel>;

  constructor(
    private bsModalService: BsModalService,
    private modalService: ModalService,
    private eventService: EventService
  ) {
    this.selected_type$.subscribe(val => {
      const params = val.type ? { time: val.type } : {}
      this.eventService.list(params).pipe().subscribe(events => {
        if (events.count === 0) {
          this.modalService.showDialog({
            position: 'center',
            title: 'events.empty_list',
            message: '',
            iconType: "not-found",
            blur: true,
            onConfirm: () => {
              this.selected_type$.next(this.types[2])
            }
          })
          return;
        }
        this.events = events
      })
    })
  }

  ngOnDestroy(): void {
    this.selected_type$.unsubscribe()
  }

  onTypeSelect(type: EventType) {
    this.events = emptyListResponse
    this.selected_type$.next(type)
  }

  onDetail(event: EventModel) {
    this.selected_type$.value
    this.bsModalService.show(EventDetailModalComponent, {
      class: 'modal-dialog-centered modal-lg',
      ignoreBackdropClick: !!event.video,
      initialState: {
        event: event,
        type: this.selected_type$.value.type
      }
    })
  }

  isPast(event: EventModel): boolean {
    var event_date = new Date(event.event_date);
    var today = new Date();
    return event_date < today
  }
}
