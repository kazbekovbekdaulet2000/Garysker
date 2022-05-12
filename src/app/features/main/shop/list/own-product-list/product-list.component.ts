import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { ListResponseModel } from '@core/models/api/list.model';
import { ProductModel } from '@core/models/api/shop/product.model';
import { ShopProductsService } from '@core/services/shop-products.service';
import { Select, Store } from '@ngxs/store';


@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  animations: [opacityAnimation, heightAnimation]
})
export class ShopProductComponent {

  products!: ListResponseModel<ProductModel>

  constructor(
    private store: Store,
    private router: Router,
    private productsService: ShopProductsService
  ) { 
    this.productsService.list().subscribe(data=>{
      this.products = data
    })  
  }
}
