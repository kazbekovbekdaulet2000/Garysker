import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { UserBagProductsModel } from '@core/models/api/shop-bag/product-detail.model';
import { LocalStorageService } from '@core/services/localStorage.service';
import { Select, Store } from '@ngxs/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CardModalComponent } from '../card/card-modal.component';
import { GetBackStorageUUID } from '../shop.actions';
import { ShopState } from '../shop.state';


interface ProductPages {
  id: number
  route: string,
  name: string
  type?: string
  color?: string
}

@Component({
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss'],
  animations: [opacityAnimation, heightAnimation]
})
export class ShopComponent {

  types: ProductPages[] = [
    {
      id: 1,
      route: "products",
      name: 'shop.pages.own',
      type: 'own'
    },
    // {
    //   id: 2,
    //   route: "organization",
    //   name: 'shop.pages.organization',
    //   type: 'organizations'
    // },
    // {
    //   id: 3,
    //   route: 'delivery',
    //   name: 'shop.pages.delivery',
    //   type: 'delivery',
    //   color: "#FFA800"
    // },
  ]

  products: any[] = []
  selected_type: string = 'products'
  @Select(ShopState.products) products$!: Observable<UserBagProductsModel[]>

  constructor(
    private store: Store,
    private router: Router,
    private bsModalService: BsModalService,
  ) {
    const user_uuid = this.store.selectSnapshot(ShopState.user_uuid)
    if(user_uuid === null){
      this.store.dispatch(new GetBackStorageUUID)
    }
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        const route = event as NavigationEnd
        switch (true) {
          case route.url.includes('organization'):
            this.selected_type = 'organization';
            break;
          case route.url.includes('delivery'):
            this.selected_type = 'delivery';
            break;
          default:
            this.selected_type = 'products';
        }
      })
  }

  onTypeSelect(type: ProductPages) {
    this.router.navigate(['/shop', type.route])
  }

  openCard(){
    this.bsModalService.show(CardModalComponent, {
      class: 'modal-dialog-centered modal-xl',
      ignoreBackdropClick: true
    })
  }
}
