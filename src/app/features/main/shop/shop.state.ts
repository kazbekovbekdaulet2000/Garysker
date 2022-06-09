import { Injectable } from '@angular/core';
import { UserBagProductsModel } from '@core/models/api/shop-bag/product-detail.model';
import { ShopUserBagService } from '@core/services/shopUserBag.service';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MessageModalComponent } from 'src/app/shared/modals/err-modal/err-modal.component';
import { AddUserBagProduct, ClearUserBagProductList, CreateOrder, DeleteUserBagProduct, GetBackStorageUUID, GetUserBagProduct, GetUserBagProductList, PatchUserBagProduct } from './shop.actions';


interface StateModel {
  user_uuid: string | null;
  products: UserBagProductsModel[]
  product: UserBagProductsModel | null
}

const defaults = {
  user_uuid: null,
  products: [],
  product: null
};

@State<StateModel>({
  name: 'shop',
  defaults
})
@Injectable()
export class ShopState {

  @Selector()
  static user_uuid({ user_uuid }: StateModel): string | null {
    return user_uuid;
  }

  @Selector()
  static products({ products }: StateModel): UserBagProductsModel[] {
    return products;
  }

  @Selector()
  static product({ product }: StateModel): UserBagProductsModel | null {
    return product;
  }

  constructor(
    private store: Store,
    private shopBagService: ShopUserBagService,
    private bsModalService: BsModalService
  ) { }

  @Action(GetBackStorageUUID)
  GetBackStorageUUID({ patchState }: StateContext<StateModel>) {
    this.shopBagService.createUUID().subscribe(data => {
      patchState({ user_uuid: data.id })
    })
  }

  @Action(GetUserBagProductList)
  GetUserBagProductList({ patchState }: StateContext<StateModel>, { uuid }: GetUserBagProductList) {
    this.shopBagService.listProducts(uuid).subscribe(products => {
      patchState({ products })
    })
  }

  @Action(AddUserBagProduct)
  AddUserBagProduct({ patchState }: StateContext<StateModel>, { uuid, body }: AddUserBagProduct) {
    this.shopBagService.addProduct(uuid, body).subscribe(() => {
      this.store.dispatch(new GetUserBagProductList(uuid))
      this.bsModalService.show(MessageModalComponent, {
        initialState: { message: "shop.detail.message.added", icon: 'err_sticker_2' },
        class: 'modal-dialog-centered'
      })
    }, (err) => {
      if (err.status === 400) {
        this.bsModalService.show(MessageModalComponent, {
          initialState: { message: "shop.detail.message.exists" },
          class: 'modal-dialog-centered'
        })
      }
    })
  }

  @Action(GetUserBagProduct)
  GetUserBagProduct({ patchState }: StateContext<StateModel>, { uuid, id }: GetUserBagProduct) {
    this.shopBagService.getProduct(uuid, id).subscribe(product => {
      patchState({ product })
    })
  }

  @Action(PatchUserBagProduct)
  PatchUserBagProduct({ patchState }: StateContext<StateModel>, { uuid, id, body }: PatchUserBagProduct) {
    this.shopBagService.patchProduct(uuid, id, body).subscribe(() => {
      this.store.dispatch(new GetUserBagProductList(uuid))
    })
  }

  @Action(DeleteUserBagProduct)
  DeleteUserBagProduct({ patchState }: StateContext<StateModel>, { uuid, id }: DeleteUserBagProduct) {
    this.shopBagService.deleteProduct(uuid, id).subscribe(() => {
      this.store.dispatch(new GetUserBagProductList(uuid))
    })
  }
  
  @Action(CreateOrder)
  CreateOrder({ getState, patchState }: StateContext<StateModel>, { body }: CreateOrder) {
    this.shopBagService.createOrder(body).subscribe(() => {
      getState().products.forEach(obj=>{
        this.shopBagService.deleteProduct(getState().user_uuid!, obj.id).subscribe()
      })
      this.bsModalService.show(MessageModalComponent, {
        initialState: { message: "shop.detail.message.success", icon: 'err_sticker_2' },
        class: 'modal-dialog-centered'
      })
      this.store.dispatch(new GetUserBagProductList(getState().user_uuid!))
    })
  }

  @Action(ClearUserBagProductList)
  ClearUserBagProductList({ patchState }: StateContext<StateModel>) {
    patchState({ products: [] });
  }
}
