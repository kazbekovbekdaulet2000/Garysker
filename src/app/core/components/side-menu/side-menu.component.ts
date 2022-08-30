import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { ListCategories, UpdateLang } from '@core/states/app/app.actions';
import { LangType } from '@core/types/lang.type';
import { AppState } from '@core/states/app/app.state';
import { Observable } from 'rxjs';

export interface SectionModel {
  route: string;
  icon: string;
  name: string;
}

@Component({
  selector: 'app-sidemenu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {
  @ViewChild('menu') menu: ElementRef
  @Input() contentHeight: number = 0;
  @Select(AppState.lang) lang$!: Observable<LangType>

  currentRoute: string | undefined;
  marginTop: number = 0
  marginBottom: number = 0

  sections: SectionModel[] = [
    {
      route: 'edu',
      icon: 'g-icon-category',
      name: 'sections.edu'
    },
    {
      route: 'projects',
      icon: 'g-icon-projects',
      name: 'sections.project'
    },
    {
      route: 'shop',
      icon: 'g-icon-bag',
      name: 'sections.shop'
    },
    {
      route: 'events',
      icon: 'g-icon-calendar',
      name: 'sections.events'
    }
  ]

  constructor(
    private store: Store,
    private router: Router,
    private renderer: Renderer2
  ) {
    this.renderer.listen("window", "scroll", () => {
      const diff = document.documentElement.scrollHeight - (32 + document.documentElement.scrollTop + this.menu.nativeElement.scrollHeight + this.menu.nativeElement.scrollHeight)
      if (diff < 0) {
        this.marginTop = diff
      } else {
        this.marginTop = 0
      }
    });
    
    this.addNavigationListener();
    this.store.dispatch(ListCategories)
  }

  addNavigationListener(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        const route = event as NavigationEnd
        switch (true) {
          case route.urlAfterRedirects.includes('edu'):
            this.currentRoute = 'edu';
            break;
          case route.urlAfterRedirects.includes('projects'):
            this.currentRoute = 'projects';
            break;
          case route.urlAfterRedirects.includes('shop'):
            this.currentRoute = 'shop';
            break;
          case route.urlAfterRedirects.includes('events'):
            this.currentRoute = 'events';
            break;
          case route.urlAfterRedirects.includes('about'):
            this.currentRoute = 'about';
            break;
          case route.urlAfterRedirects.includes('main'):
            this.currentRoute = 'main';
            break;
          default:
            this.currentRoute = 'edu';
        }
      })
  }

  changeLang(lang: LangType) {
    this.store.dispatch(new UpdateLang(lang))
  }
}