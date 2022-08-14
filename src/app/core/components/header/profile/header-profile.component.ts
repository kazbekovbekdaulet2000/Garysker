import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { heightOutAnimation } from '@core/animations/height-out-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { UserModel } from '@core/models/api/user.model';
import { ModalService } from '@core/services/modal.service';
import { RemoveToken } from '@core/states/auth/actions';
import { AuthState } from '@core/states/auth/auth.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss'],
  animations: [opacityAnimation, heightOutAnimation],
})
export class HeaderProfileComponent implements OnInit {

  main = '';
  dropdown: boolean = false;

  @Select(AuthState.authorized) authorized$!: Observable<boolean>;
  @Select(AuthState.profile) profile$!: Observable<UserModel>;

  @ViewChild('menu') menu: ElementRef | any;

  constructor(
    private router: Router,
    private store: Store,
    private modalService: ModalService
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(() => {
        this.dropdown = false
      })
  }

  ngOnInit(): void {
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

  dropdownToggle() {
    this.dropdown = !this.dropdown
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
