import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { UserModel } from '@core/models/api/user.model';
import { RemoveToken } from '@core/states/auth/actions';
import { AuthState } from '@core/states/auth/auth.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'core-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [opacityAnimation],
})
export class HeaderComponent implements OnInit {

  main = '';

  dropdown: boolean = false;

  sideBar: boolean = false;

  dataAvailable: boolean = false

  @Select(AuthState.access) access$!: Observable<string>;
  @Select(AuthState.profile) profile$!: Observable<UserModel>;

  @ViewChild('toggleDiv') toggleDiv: ElementRef | any;
  @ViewChild('menu') menu: ElementRef | any;

  constructor(
    private router: Router,
    private store: Store,
    private renderer: Renderer2
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (e.target !== this.toggleDiv.nativeElement && e.target !== this.menu?.nativeElement) {
        this.dropdown = false;
      }
    });
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
          default:
            this.main = '';
        }
        this.dataAvailable = true
      })
  }

  dropdownToggle() {
    this.dropdown = !this.dropdown
  }

  logout(){
    this.dropdown=false
    this.store.dispatch(RemoveToken)
  }
}
