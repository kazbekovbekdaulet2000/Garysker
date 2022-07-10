import { Injectable } from '@angular/core';
import { emptyListResponse, ListResponseModel } from '@core/models/api/list.model';
import { UserBagProductsModel } from '@core/models/api/shop-bag/product-detail.model';
import { ShopUserBagService } from '@core/services/shopUserBag.service';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';


interface StateModel {
  projectsList: ListResponseModel<any>;
}

const defaults = {
  projectsList: emptyListResponse,
};

@State<StateModel>({
  name: 'projects',
  defaults
})
@Injectable()
export class ProjectsState {

  @Selector()
  static projectsList({ projectsList }: StateModel): ListResponseModel<any> {
    return projectsList;
  }

  constructor(
    private store: Store,
  ) { }

  // @Action(GetBackStorageUUID)
  // GetBackStorageUUID({ patchState }: StateContext<StateModel>) {
  //   this.shopBagService.createUUID().subscribe(data => {
  //     patchState({ user_uuid: data.id })
  //   })
  // }

  // @Action(ClearUserBagProductList)
  // ClearUserBagProductList({ patchState }: StateContext<StateModel>) {
  //   patchState({ products: [] });
  // }
}
