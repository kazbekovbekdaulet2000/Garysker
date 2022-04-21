import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { EventModel } from '@core/models/api/event.model';
import { ListResponseModel } from '@core/models/api/list.model';

@Injectable({
  providedIn: 'root'
})

export class EventService extends ApiService {

  constructor(
    protected http: HttpClient
  ) {
    super('events');
  }

  list(params?: any): Observable<ListResponseModel<EventModel>> {
    return this.http.get<ListResponseModel<EventModel>>(this.getUrl(), { params })
  }

  get(eventId: number): Observable<EventModel> {
    return this.http.get<EventModel>(this.getUrl(eventId))
  }

  participate(eventId: number): Observable<any> {
    return this.http.post<any>(this.getUrl(`${eventId}/participate`), {})
  }

  save(eventId: number): Observable<any> {
    return this.http.post<any>(this.getUrl(`${eventId}/save`), {})
  }

}
