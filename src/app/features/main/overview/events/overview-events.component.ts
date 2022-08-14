import { Component, Input } from '@angular/core';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { EventModel } from '@core/models/api/event.model';
import { emptyListResponse, ListResponseModel } from '@core/models/api/list.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { EventDetailModalComponent } from '../../events/list/detail/detail-modal.component';

@Component({
  selector: 'app-overview-events',
  templateUrl: './overview-events.component.html',
  styleUrls: ['./overview-events.component.scss'],
  animations: [opacityAnimation]
})
export class ProjectOverviewEventsComponent {

  @Input() events: ListResponseModel<EventModel> = emptyListResponse;

  constructor(
    private bsModalService: BsModalService,
  ) { }

  openEvent(event: EventModel) {
    this.bsModalService.show(EventDetailModalComponent, {
      class: 'modal-dialog-centered modal-lg',
      ignoreBackdropClick: !!event.video,
      initialState: {
        event: event,
      }
    })
  }
}