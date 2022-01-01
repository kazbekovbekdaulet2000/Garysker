import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import { PopLoaderQueue, PushLoaderQueue } from './actions';


interface LoaderStateModel {
  queue: string[] | [];
}

const defaults: LoaderStateModel = {
  queue: [],
};

@State<LoaderStateModel>({
  name: 'loader',
  defaults
})
@Injectable()
export class LoaderState {

  @Selector()
  static queue({queue}: LoaderStateModel): string[] | [] {
    return queue;
  }

  @Action(PushLoaderQueue)
  PushLoaderQueue({patchState, getState}: StateContext<LoaderStateModel>, {event}: PushLoaderQueue) {
    console.log(event)
    
    return patchState({
      queue: [...getState().queue, event]
    });
  }

  @Action(PopLoaderQueue)
  PopLoaderQueue({patchState, getState}: StateContext<LoaderStateModel>, {event}: PopLoaderQueue) {
    const queue = getState().queue;
    const foundIndex = queue.findIndex(i => i === event);

    if (foundIndex !== -1) {
      queue.splice(foundIndex, 1);
    }

    return patchState({
      queue: [...queue]
    });
  }
}
