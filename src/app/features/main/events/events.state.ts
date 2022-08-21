import { Injectable } from '@angular/core';
import { EventModel } from '@core/models/api/event.model';
import { emptyListResponse, ListResponseModel } from '@core/models/api/list.model';
import { VideoDetailModel, VideoModel } from '@core/models/api/video.model';
import { EventService } from '@core/services/event.service';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import * as moment from 'moment';
import { ClearEvents, ListEvents } from './events.actions';

interface StateModel {
  events: ListResponseModel<EventModel>;
  video: VideoDetailModel | null;
}

const defaults = {
  events: emptyListResponse,
  video: null,
};

@State<StateModel>({
  name: 'Events',
  defaults
})
@Injectable()
export class EventsState {

  @Selector()
  static events({ events }: StateModel): ListResponseModel<EventModel> {
    return events;
  }

  constructor(
    private eventService: EventService
  ) { }

  @Action(ListEvents)
  ListEvents({ patchState }: StateContext<StateModel>, { params }: ListEvents) {
    this.eventService.list(params).subscribe(events => {
      patchState({ events })
    })
  }

  @Action(ClearEvents)
  ClearEvents({ patchState }: StateContext<StateModel>) {
    patchState({ events: emptyListResponse });
  }
}
