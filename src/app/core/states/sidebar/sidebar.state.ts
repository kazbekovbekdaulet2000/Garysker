import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';

import { CategoryModel } from '@core/models/api/category.model';
import { FilterByDobro, ListCategories } from './actions';
import { CategoriesService } from '@core/services/categories.service';
import { ListDobroProjects } from 'src/app/features/main/main.actions';


interface StateModel {
  categories: CategoryModel[] | [];
  selected_dobro: number | null;
}

const defaults = {
  categories: [],
  selected_dobro: null,
};

@State<StateModel>({
  name: 'Sidebar',
  defaults
})
@Injectable()
export class SidebarState {

  @Selector()
  static categories({ categories }: StateModel): CategoryModel[] {
    return categories;
  }

  @Selector()
  static selected_dobro({ selected_dobro }: StateModel): number | null {
    return selected_dobro;
  }

  constructor(
    private store: Store,
    private categoryService: CategoriesService
  ) {
  }

  @Action(ListCategories)
  ListCategories({ getState, patchState }: StateContext<StateModel>) {
    this.categoryService.list()
      .toPromise()
      .then(categories => {
        patchState({ categories });
      })
  }

  @Action(FilterByDobro)
  FilterByDobro({ patchState }: StateContext<StateModel>, { id }: FilterByDobro) {
    patchState({ selected_dobro: id });
    this.store.dispatch(ListDobroProjects)
  }
}
