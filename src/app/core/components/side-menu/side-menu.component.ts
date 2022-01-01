import { Component, OnInit } from '@angular/core';
import { NavigationEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { ListCategories } from '@core/states/sidebar/actions';
import { CategoryList } from '@core/models/api/category.model';
import { Observable } from 'rxjs';
import { SidebarState } from '@core/states/sidebar/sidebar.state';


@Component({
  selector: 'core-sidemenu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  currentRoute: string | undefined;
  
  selectedSection: number | undefined

  @Select(SidebarState.categories)
  categories$!: Observable<CategoryList>;

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

  routeCategory(id: number){
    this.selectedSection = id
  }

  ngOnInit(): void {
  }

  onClick(str: string) {

  }

  navigateTelegram(){
    window.open('https://t.me/garyshkerchat', '_blank')
  }

}
