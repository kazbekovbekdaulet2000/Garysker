import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';

import { FilterByDobro } from './actions';
import { ListDobroProjects } from 'src/app/features/main/main.actions';


interface StateModel {
  selected_dobro: number | null;
}

const defaults = {
  selected_dobro: null,
};

@State<StateModel>({
  name: 'Sidebar',
  defaults
})
@Injectable()
export class SidebarState {

  @Selector()
  static selected_dobro({ selected_dobro }: StateModel): number | null {
    return selected_dobro;
  }

  constructor(
    private store: Store,
  ) {
  }

  @Action(FilterByDobro)
  FilterByDobro({ patchState }: StateContext<StateModel>, { id }: FilterByDobro) {
    patchState({ selected_dobro: id });
    this.store.dispatch(ListDobroProjects)
  }
}
