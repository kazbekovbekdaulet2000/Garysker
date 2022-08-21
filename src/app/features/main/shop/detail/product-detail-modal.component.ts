import { Component, OnInit } from '@angular/core';
import { heightOutAnimation } from '@core/animations/height-out-animation';
import { ProductDetailModel } from '@core/models/api/shop/product-detail.model';
import { ProductSizeModel } from '@core/models/api/shop/product-size.model';
import { ShopProductsService } from '@core/services/shop-products.service';
import { AppState } from '@core/states/app/app.state';
import { LangType } from '@core/types/lang.type';
import { Select, Store } from '@ngxs/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddUserBagProduct, DeleteUserBagProduct } from '../shop.actions';
import { ShopState } from '../shop.state';

@Component({
  templateUrl: './product-detail-modal.component.html',
  styleUrls: ['./product-detail-modal.component.scss'],
  animations: [heightOutAnimation]
})
export class ProductDetailModalComponent implements OnInit {

  @Select(AppState.lang) lang$!: Observable<LangType>

  productId!: number;
  product!: ProductDetailModel;
  sizes!: ProductSizeModel[];
  sizeExpanded: boolean = false;
  product_count: number = 1;
  selectedSize!: ProductSizeModel;

  constructor(
    private bsModalRef: BsModalRef,
    private store: Store,
    private productService: ShopProductsService,
  ) { }

  ngOnInit(): void {
    this.productService.get(this.productId).subscribe(data => {
      this.product = data
    })
    this.productService.getSizes(this.productId).subscribe(data => {
      this.sizes = data
    })
  }

  toggleSizeExpand() {
    this.sizeExpanded = !this.sizeExpanded
  }

  onConfirm(): void {
    this.closeModal()
  }

  increaseCount() {
    this.product_count++
  }

  decreaseCount() {
    if (this.product_count <= 1) {
      return
    }
    this.product_count--
  }

  selectSize(size: ProductSizeModel) {
    this.selectedSize = size
  }

  removeProduct() {
    const uuid = this.store.selectSnapshot(ShopState.user_uuid)
    this.store.dispatch(new DeleteUserBagProduct(uuid!, this.productId))
  }

  addProduct() {
    if (!!this.selectedSize) {
      const uuid = this.store.selectSnapshot(ShopState.user_uuid)
      this.closeModal()
      this.store.dispatch(new AddUserBagProduct(uuid!, { product: this.productId, size: this.selectedSize.id, count: this.product_count }))
    }
  }

  closeModal() {
    this.bsModalRef.hide()
  }

  get sizeCompound(): Observable<String> {
    return this.lang$.pipe(map(lang => {
      return this.product.compound.map(obj => {
        return lang === 'ru' ? obj.name_ru : obj.name_kk
      }).join(', ')
    }))
  }
}