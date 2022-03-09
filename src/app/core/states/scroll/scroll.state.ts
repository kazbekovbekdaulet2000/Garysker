import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UpdateTop } from './scroll';

interface TopStateModel {
  top: number;
}

const defaults = {
  top: 0
};

@State<TopStateModel>({
  name: 'scroll',
  defaults
})
@Injectable()
export class ScrollState {

  @Selector()
  static top({ top }: TopStateModel): number {
    return top;
  }

  constructor() { }

  @Action(UpdateTop)
  UpdateTop({ patchState }: StateContext<TopStateModel>, { top }: UpdateTop) {
    return patchState({ top });
  }
}
