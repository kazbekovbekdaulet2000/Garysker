import { AfterContentChecked, ChangeDetectorRef, Component, OnChanges, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { ListCategories } from '@core/states/sidebar/actions';


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

  navigateTelegram() {
    // window.open('https://t.me/garyshkerchat', '_blank')
  }
}
