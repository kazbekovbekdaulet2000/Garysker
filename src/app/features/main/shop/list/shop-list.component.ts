import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { Select, Store } from '@ngxs/store';
import { filter } from 'rxjs/operators';


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
    {
      id: 2,
      route: "organization",
      name: 'shop.pages.organization',
      type: 'organizations'
    },
    {
      id: 3,
      route: 'delivery',
      name: 'shop.pages.delivery',
      type: 'delivery',
      color: "#FFA800"
    },
  ]

  selected_type: string = 'products'

  constructor(
    private store: Store,
    private router: Router,
  ) {
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
}
