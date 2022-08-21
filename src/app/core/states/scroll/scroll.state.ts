import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UpdateHorizontal, UpdateTop } from './scroll';

interface TopStateModel {
  top: number;
  horizontal: number;
}

const defaults = {
  top: 0,
  horizontal: 0,
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

  @Selector()
  static horizontal({ horizontal }: TopStateModel): number {
    return horizontal;
  }

  constructor() { }

  @Action(UpdateTop)
  UpdateTop({ patchState }: StateContext<TopStateModel>, { top }: UpdateTop) {
    return patchState({ top });
  }

  @Action(UpdateHorizontal)
  UpdateHorizontal({ patchState }: StateContext<TopStateModel>, { horizontal }: UpdateHorizontal) {
    return patchState({ horizontal });
  }

}
