import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Init } from '@core/states/app/app.actions';
import { UpdateProfile } from '@core/states/auth/actions';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Store } from '@ngxs/store';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'garyshker-front';

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(
    private router: Router,
    private store: Store,
    private observer: BreakpointObserver,
  ) {
    this.store.dispatch(Init);
    this.store.dispatch(UpdateProfile)
    this.observer
      .observe(['(max-width: 320px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      });
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }
}
