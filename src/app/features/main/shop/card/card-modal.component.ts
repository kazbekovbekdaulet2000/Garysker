import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { heightOutAnimation } from '@core/animations/height-out-animation';
import { UserBagProductsModel } from '@core/models/api/shop-bag/product-detail.model';
import { Select, Store } from '@ngxs/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateOrder, DeleteUserBagProduct, GetUserBagProductList, PatchUserBagProduct } from '../shop.actions';
import { ShopState } from '../shop.state';

@Component({
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss'],
  animations: [heightOutAnimation]
})
export class CardModalComponent {

  uuid = this.store.selectSnapshot(ShopState.user_uuid)
  @Select(ShopState.products) products$!: Observable<UserBagProductsModel[]>

  formData = this.formBuilder.group({
    name: [null, Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [null, Validators.required],
    address: [null],
    city: [null],
    post_id: [null],
    delivery_type: [null, Validators.required],
    products: []
  })

  constructor(
    private bsModalRef: BsModalRef,
    private store: Store,
    private formBuilder: FormBuilder
  ) {
    this.products$.subscribe(data => {
      this.formData.patchValue({
        'delivery_type': 0,
        'products': data.map(obj => {
          return { product: obj.product.id, count: obj.count, size: obj.size.id }
        })
      })
    })
    this.store.dispatch(new GetUserBagProductList(this.uuid!))
  }

  onConfirm(): void {
    this.closeModal()
  }

  closeModal() {
    this.bsModalRef.hide()
  }

  removeProductOrder(orderId: number) {
    this.store.dispatch(new DeleteUserBagProduct(this.uuid!, orderId))
  }

  changeCount(order: UserBagProductsModel, type: 'increase' | 'decrease' = 'increase') {
    this.store.dispatch(new PatchUserBagProduct(this.uuid!, order.id, { count: type === 'increase' ? order.count + 1 : (order.count > 1 ? order.count - 1 : order.count) }))
  }

  get price(): Observable<number> {
    return this.products$.pipe(map(list => list.map(obj => (obj.product.price * obj.count)).reduce((sum, num) => sum + num, 0)))
  }

  get selectedType(): number {
    return this.formData.get('delivery_type')?.value
  }

  selectType(id: number) {
    this.formData.patchValue({
      'delivery_type': id
    })
  }

  createOrder(){
    this.closeModal()
    this.store.dispatch(new CreateOrder(this.formData.getRawValue()))
  }
}
