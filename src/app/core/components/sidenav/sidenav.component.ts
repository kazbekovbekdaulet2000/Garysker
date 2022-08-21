import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { heightOutAnimation } from '@core/animations/height-out-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { UserModel } from '@core/models/api/user.model';
import { ModalService } from '@core/services/modal.service';
import { UpdateLang } from '@core/states/app/app.actions';
import { AppState } from '@core/states/app/app.state';
import { RemoveToken } from '@core/states/auth/actions';
import { AuthState } from '@core/states/auth/auth.state';
import { LangType } from '@core/types/lang.type';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SectionModel } from '../side-menu/side-menu.component';

@Component({
  selector: 'app-core-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [opacityAnimation, heightOutAnimation],
})
export class SidenavComponent{
  main = '';
  userMenu: boolean = false;
  @Select(AuthState.access) access$!: Observable<string>;
  @Select(AuthState.profile) profile$!: Observable<UserModel>;
  @Select(AppState.lang) lang$!: Observable<LangType>

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
    },
    {
      route: 'main',
      icon: 'g-icon-g',
      name: 'sections.about_g'
    }
  ]

  constructor(
    private router: Router,
    private store: Store,
    private modalService: ModalService
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        const route = (event as NavigationEnd).urlAfterRedirects
        switch (true) {
          case route.includes('profile'):
            this.main = 'profile'
            break;
          case route.includes('application'):
            this.main = 'application'
            break;
          case route.includes('auth'):
            this.main = 'auth';
            break;
          case route.includes('edu'):
            this.main = 'edu'
            break;
          case route.includes('projects'):
            this.main = 'projects'
            break;
          case route.includes('events'):
            this.main = 'events'
            break;
          case route.includes('shop'):
            this.main = 'shop'
            break;
          case route.includes('about'):
            this.main = 'about'
            break;
          case route.includes('main'):
            this.main = 'main'
            break;
          default:
            this.main = '';
        }
      })
  }

  triggerMenu() {
    this.userMenu = !this.userMenu
  }

  navigateRoute(route: string) {
    this.router.navigate([route])
  }

  changeLang(lang: LangType) {
    this.store.dispatch(new UpdateLang(lang))
  }

  logout() {
    this.modalService.showConfirmDialog({
      icon: 'stickers/sticker2',
      title: 'auth.logout_modal.title',
      cancelText: 'auth.logout_modal.false',
      confirmText: 'auth.logout_modal.true',
      position: 'center',
      message: '',
      onConfirm: () => {
        this.store.dispatch(RemoveToken)
        if (this.main === 'profile') {
          this.router.navigate(['/edu'])
        }
      }
    })
  }
}
