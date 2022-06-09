import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { heightOutAnimation } from '@core/animations/height-out-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { UserModel } from '@core/models/api/user.model';
import { UpdateLang } from '@core/states/app/app.actions';
import { AppState } from '@core/states/app/app.state';
import { RemoveToken } from '@core/states/auth/actions';
import { AuthState } from '@core/states/auth/auth.state';
import { LangType } from '@core/types/lang.type';
import { Select, Store } from '@ngxs/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ConfirmModalComponent } from 'src/app/shared/modals/confirm-modal/confirm-modal.component';

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

  constructor(
    private router: Router,
    private store: Store,
    private bsModalService: BsModalService
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        const route = event as NavigationEnd
        switch (true) {
          case route.url.includes('profile'):
            this.main = 'profile'
            break;
          case route.url.includes('application'):
            this.main = 'application'
            break;
          case route.url.includes('auth'):
            this.main = 'auth';
            break;
          case route.url.includes('edu'):
            this.main = 'edu'
            break;
          case route.url.includes('products'):
            this.main = 'products'
            break;
          case route.url.includes('events'):
            this.main = 'events'
            break;
          case route.url.includes('shop'):
            this.main = 'shop'
            break;
          case route.url.includes('about'):
            this.main = 'about'
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
    const modal = this.bsModalService.show(ConfirmModalComponent, {
      initialState: {
        icon: "err_sticker_2",
        message: "auth.logout_modal.title",
        false_ans: "auth.logout_modal.false",
        true_ans: "auth.logout_modal.true",
        false_ans_background: "group-background",
      },
      class: 'modal-dialog-centered'
    })

    modal.content!.onClose.subscribe(result => {
      if (result === true) {
        this.store.dispatch(RemoveToken)
        if (this.main === 'profile') {
          this.router.navigate(['/edu'])
        }
      }
    });
  }
}
