import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { emptyListResponse, ListResponseModel } from '@core/models/api/list.model';
import { ProductModel } from '@core/models/api/shop/product.model';
import { ShopProductsService } from '@core/services/shop-products.service';
import { Select, Store } from '@ngxs/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable, of } from 'rxjs';
import { ProductDetailModalComponent } from '../../detail/product-detail-modal.component';


@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  animations: [opacityAnimation, heightAnimation]
})
export class ShopProductComponent {

  products$: Observable<ListResponseModel<ProductModel>> = of(emptyListResponse)

  constructor(
    private bsModalService: BsModalService,
    private productsService: ShopProductsService
  ) { 
    this.products$ = this.productsService.list()
  }

  openProduct(product: ProductModel){
    this.bsModalService.show(ProductDetailModalComponent, {
      class: 'modal-dialog-centered modal-xl',
      initialState: { 
        productId: product.id
      }
    })
  }
}
