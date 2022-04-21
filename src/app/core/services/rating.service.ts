import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ListResponseModel } from '@core/models/api/list.model';
import { RatingModel } from '@core/models/api/rating.model';


@Injectable()
export class RatingsService extends ApiService {

  static getProvider(url: string) {
    return {
      provide: RatingsService,
      deps: [HttpClient],
      useFactory: (dep: HttpClient) => {
        return new RatingsService(dep, url);
      }
    }
  }

  constructor(
    public http: HttpClient,
    @Inject(String) public url: string,
  ) {
    super(url);
  }

  list(id: number, params?: any): Observable<ListResponseModel<RatingModel>> {
    return this.http.get<ListResponseModel<RatingModel>>(this.getUrl(`${id}/ratings`), { params });
  }

  get(id: number, ratingId: number): Observable<RatingModel> {
    return this.http.get<RatingModel>(this.getUrl(`${id}/ratings/${ratingId}`));
  }

  post(id: number, payload: any): Observable<RatingModel> {
    return this.http.post<RatingModel>(this.getUrl(`${id}/ratings`), payload);
  }

  delete(id: number, ratingId: number): Observable<any> {
    return this.http.delete<any>(this.getUrl(`${id}/ratings/${ratingId}`));
  }
}