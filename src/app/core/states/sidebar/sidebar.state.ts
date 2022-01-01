import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';

import { CategoryList } from '@core/models/api/category.model';
import { ListCategories } from './actions';
import { CategoriesService } from '@core/services/categories.service';


interface StateModel {
  categories: CategoryList | null;
}

const defaults = {
  categories: null,
};

@State<StateModel>({
  name: 'Sidebar',
  defaults
})
@Injectable()
export class SidebarState {

  @Selector()
  static categories({ categories }: StateModel): CategoryList | null {
    return categories;
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
      .then(res=>{
        patchState({ categories: res });
      })
  }
}
