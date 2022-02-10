import { AfterContentChecked, ChangeDetectorRef, Component, OnChanges, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { FilterByCategory, FilterByDobro, ListCategories } from '@core/states/sidebar/actions';
import { CategoryModel } from '@core/models/api/category.model';
import { Observable } from 'rxjs';
import { SidebarState } from '@core/states/sidebar/sidebar.state';
import { ClearPopular } from 'src/app/features/main/main.actions';


@Component({
  selector: 'core-sidemenu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements AfterContentChecked, OnChanges {

  currentRoute: string | undefined;

  selectedCategorySection: number | null | undefined;
  selectedDobroSection: number | null | undefined;

  @Select(SidebarState.categories)
  categories$!: Observable<CategoryModel[]>;

  constructor(
    private store: Store,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
  ) {
    this.addNavigationListener();
    this.store.dispatch(new ListCategories())
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.changeDetector.detectChanges()
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges()
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
      this.store.dispatch(ClearPopular)
    } else {
      this.selectedCategorySection = null
    }
    this.updateContent()
  }

  removeRouteCategory() {
    if (this.selectedCategorySection !== null && this.selectedCategorySection !== undefined) {
      this.selectedCategorySection = null
      this.updateContent()
    }
  }

  removeRouteDobro() {
    if (this.selectedDobroSection !== null && this.selectedDobroSection !== undefined) {
      this.selectedDobroSection = null
      this.store.dispatch(new FilterByDobro(this.selectedDobroSection))
    }
  }

  updateContent() {
    this.store.dispatch(new FilterByCategory(this.selectedCategorySection!))
  }

  routeDobroType(id: number) {
    if (this.selectedDobroSection !== id) {
      this.selectedDobroSection = id
    } else {
      this.selectedDobroSection = null
    }
    this.store.dispatch(new FilterByDobro(this.selectedDobroSection))
  }

  onClick(str: string) {

  }

  navigateTelegram() {
    // window.open('https://t.me/garyshkerchat', '_blank')
  }

}
