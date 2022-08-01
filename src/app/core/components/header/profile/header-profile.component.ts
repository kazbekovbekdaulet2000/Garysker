import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { heightOutAnimation } from '@core/animations/height-out-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { UserModel } from '@core/models/api/user.model';
import { AppState } from '@core/states/app/app.state';
import { RemoveToken } from '@core/states/auth/actions';
import { AuthState } from '@core/states/auth/auth.state';
import { Select, Store } from '@ngxs/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ConfirmModalComponent } from 'src/app/shared/modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss'],
  animations: [opacityAnimation, heightOutAnimation],
})
export class HeaderProfileComponent implements OnInit {

  main = '';

  dropdown: boolean = false;

  sideBar: boolean = false;

  userMenu: boolean = false;

  sidebar: string = '100%';

  @Select(AuthState.access) access$!: Observable<string>;
  @Select(AuthState.profile) profile$!: Observable<UserModel>;

  @ViewChild('toggleDiv') toggleDiv: ElementRef | any;
  @ViewChild('menu') menu: ElementRef | any;

  constructor(
    private router: Router,
    private store: Store,
    private renderer: Renderer2,
    private bsModalService: BsModalService,
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(() => {
        this.sidebar = '100%'
      })
    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.menu) {
        if (e.target !== this.toggleDiv.nativeElement && e.target !== this.menu?.nativeElement) {
          this.dropdown = false;
        }
      }
    });
  }

  ngOnInit(): void {
    const lang = this.store.selectSnapshot(AppState.lang)

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

  navigateRoute(path: string) {
    this.activateMenu()
    this.router.navigate([path])
  }

  activateMenu() {
    if (this.sidebar === "100%") {
      this.sidebar = "0%";
    } else {
      this.sidebar = "100%";
    }
  }

  dropdownToggle() {
    this.dropdown = !this.dropdown
  }

  triggerMenu() {
    this.userMenu = !this.userMenu
  }

  logout() {
    this.dropdown = false
    const modal = this.bsModalService.show(ConfirmModalComponent, {
      initialState: {
        icon: "stickers/sticker2",
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
          this.activateMenu()
          this.router.navigate(['/edu'])
        }
      }
    });
  }
}
