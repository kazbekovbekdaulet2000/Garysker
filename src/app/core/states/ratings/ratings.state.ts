import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { emptyListResponse, ListResponseModel } from '@core/models/api/list.model';
import { ClearRatings, DeleteRating, ListRatings, PostRating } from './ratings.actions';
import { RatingModel } from '@core/models/api/rating.model';
import { RatingsService } from '@core/services/rating.service';


interface StateModel {
  ratings: ListResponseModel<RatingModel>
}

const defaults = {
  ratings: emptyListResponse,
};

@State<StateModel>({
  name: 'Ratings',
  defaults
})
@Injectable()
export class RatingsState {

  @Selector()
  static ratings({ ratings }: StateModel): ListResponseModel<RatingModel> {
    return ratings;
  }

  constructor(
    private ratingsService: RatingsService
  ) {
  }

  @Action(ListRatings)
  ListRatings({ getState, patchState }: StateContext<StateModel>, { id }: ListRatings) {
    if (getState().ratings.next) {
      const next = getState().ratings.next
      const page = next.split('page=')[1]
      if (page) {
            const params = { page }
            this.ratingsService.list(id, params)
              .subscribe(ratings => {
                const list = getState().ratings.results
                getState().ratings.next = ratings.next
                getState().ratings.previous = ratings.previous
                getState().ratings.results = [...list, ...ratings.results]
              })
          }
    } else {
      this.ratingsService.list(id)
        .subscribe(ratings => {
          patchState({ ratings })
        })
    }
  }

  @Action(PostRating)
  PostRating({ getState }: StateContext<StateModel>, { id, payload }: PostRating) {
    this.ratingsService.post(id!, payload)
      .subscribe(rating => {
        getState().ratings.count++
        const list = [...[rating], ...getState().ratings.results]
        getState().ratings.results = list
      })
  }

  @Action(DeleteRating)
  DeleteRating({ getState, patchState }: StateContext<StateModel>, { id, ratingId }: DeleteRating) {
    this.ratingsService.delete(id, ratingId)
      .subscribe(() => {
        patchState({
          ratings: {
            ...getState().ratings,
            count: getState().ratings.count-1,
            results: getState().ratings.results.filter(val => val.id !== ratingId)
          }
        })
      })
  }

  @Action(ClearRatings)
  ClearRatings({ patchState, getState }: StateContext<StateModel>) {
    patchState({ ratings: emptyListResponse})
  }
}
