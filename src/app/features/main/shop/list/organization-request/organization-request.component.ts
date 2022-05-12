import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { ListResponseModel } from '@core/models/api/list.model';
import { ProductModel } from '@core/models/api/shop/product.model';
import { ShopProductsService } from '@core/services/shop-products.service';
import { Select, Store } from '@ngxs/store';


@Component({
  templateUrl: './organization-request.component.html',
  styleUrls: ['./organization-request.component.scss'],
  animations: [opacityAnimation, heightAnimation]
})
export class ShopOrganizationRequestComponent {

  products!: ListResponseModel<ProductModel>

  formGroup = this.formBuilder.group({
    email: [null, Validators.required],
  })

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
  ) { 
  }
}
