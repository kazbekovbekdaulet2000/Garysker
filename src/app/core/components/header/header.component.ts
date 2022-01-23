import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthState } from '@core/states/auth/auth.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'core-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  main = '';
  
  dataAvailable: boolean = false

  @Select(AuthState.access) access$!: Observable<string>;
  
  constructor(
    private router: Router,
    private store: Store
  ) { 
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        const route = event as NavigationEnd
        console.log(route.url)
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

}
