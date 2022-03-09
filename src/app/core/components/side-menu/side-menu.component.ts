import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { ListCategories } from '@core/states/sidebar/actions';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IokaPaymentComponent } from 'src/app/shared/components/payment/payment.component';


@Component({
  selector: 'core-sidemenu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {

  currentRoute: string | undefined;

  constructor(
    private store: Store,
    private router: Router,
    private bsModalService: BsModalService
  ) {
    this.addNavigationListener();
    this.store.dispatch(new ListCategories())
  }

  addNavigationListener(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        const route = event as NavigationEnd
        switch (true) {
          case route.url.includes('edu'):
            this.currentRoute = 'edu';
            break;
          case route.url.includes('dobro'):
            this.currentRoute = 'dobro';
            break;
          case route.url.includes('products'):
            this.currentRoute = 'products';
            break;
          case route.url.includes('shop'):
            this.currentRoute = 'shop';
            break;
          case route.url.includes('events'):
            this.currentRoute = 'events';
            break;
          case route.url.includes('about'):
            this.currentRoute = 'about';
            break;
          default:
            this.currentRoute = 'edu';
        }
      })
  }

  helpProject() {
    this.bsModalService.show(IokaPaymentComponent,
      {
        animated: true,
        class: 'modal-content-payment'
      })
    // this.router.navigate(['payment'])
  }
}
