import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';

import { CategoryModel } from '@core/models/api/category.model';
import { FilterByCategory, FilterByDobro, ListCategories } from './actions';
import { CategoriesService } from '@core/services/categories.service';
import { ListReports } from 'src/app/features/main/edu/report-module/report.actions';
import { ListVideos } from 'src/app/features/main/edu/video-module/video.actions';
import { ListDobroProjects } from 'src/app/features/main/main.actions';


interface StateModel {
  selected_category: number | null;
  categories: CategoryModel[] | [];
  selected_dobro: number | null;
}

const defaults = {
  selected_category: null,
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
  static selected_category({ selected_category }: StateModel): number | null {
    return selected_category;
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

  @Action(FilterByCategory)
  FilterByCategory({ patchState }: StateContext<StateModel>, { id }: FilterByCategory) {
    patchState({ selected_category: id });
    this.store.dispatch([ListReports, ListVideos])
  }

  @Action(FilterByDobro)
  FilterByDobro({ patchState }: StateContext<StateModel>, { id }: FilterByDobro) {
    patchState({ selected_dobro: id });
    this.store.dispatch(ListDobroProjects)
  }
}
