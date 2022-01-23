import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { FilterByCategory, ListCategories } from '@core/states/sidebar/actions';
import { CategoryModel } from '@core/models/api/category.model';
import { Observable } from 'rxjs';
import { SidebarState } from '@core/states/sidebar/sidebar.state';


@Component({
  selector: 'core-sidemenu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {

  currentRoute: string | undefined;

  selectedCategorySection: number | null | undefined;
  selectedDobroSection: number | null | undefined;

  @Select(SidebarState.categories)
  categories$!: Observable<CategoryModel[]>;

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
          default:
            this.currentRoute = 'edu';
        }
      })
  }

  routeCategory(id: number) {
    if (this.selectedCategorySection !== id) {
      this.selectedCategorySection = id
    } else {
      this.selectedCategorySection = null
    }
    this.store.dispatch(new FilterByCategory(this.selectedCategorySection))
  }

  routeDobroType(id: number) {
    if (this.selectedDobroSection !== id) {
      this.selectedDobroSection = id
    } else {
      this.selectedDobroSection = null
    }
    // this.store.dispatch(new FilterByCategory(this.selectedDobroSection))
  }

  onClick(str: string) {

  }

  navigateTelegram() {
    // window.open('https://t.me/garyshkerchat', '_blank')
  }

}
