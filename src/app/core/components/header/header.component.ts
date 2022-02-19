import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { UserModel } from '@core/models/api/user.model';
import { ReportsService } from '@core/services/reports.service';
import { VideosService } from '@core/services/videos.service';
import { RemoveToken } from '@core/states/auth/actions';
import { AuthState } from '@core/states/auth/auth.state';
import { Select, Store } from '@ngxs/store';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'core-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [opacityAnimation],
})
export class HeaderComponent implements OnInit, OnDestroy {

  main = '';

  dropdown: boolean = false;

  sideBar: boolean = false;

  dataAvailable: boolean = false

  sidebar: string = '100%';

  @Select(AuthState.access) access$!: Observable<string>;
  @Select(AuthState.profile) profile$!: Observable<UserModel>;

  @ViewChild('toggleDiv') toggleDiv: ElementRef | any;
  @ViewChild('menu') menu: ElementRef | any;
  @ViewChild('search') search: ElementRef | any;

  showSearch: boolean = false

  private unsubscriber = new Subject<void>();
  searchText = new FormControl('');

  list$!: Observable<any[]>

  constructor(
    private router: Router,
    private store: Store,
    private renderer: Renderer2,
    private reportService: ReportsService,
    private videoService: VideosService
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((val) => {
        this.sidebar = '100%'
      })
    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.menu) {
        if (e.target !== this.toggleDiv.nativeElement && e.target !== this.menu?.nativeElement) {
          this.dropdown = false;
        }
      }
      if (this.search) {
        if (e.target !== this.search?.nativeElement) {
          this.showSearch = false;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  ngOnInit(): void {
    this.searchText.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.unsubscriber)
      )
      .subscribe(value => {
        if (value !== '') {
          this.showSearch = true
          this.list$ = combineLatest([
            this.reportService.list({ title: value }),
            this.videoService.list({ title: value })
          ]).pipe(
            map(res => {
              const list = res.reduce((prev: any, curr: any) => {
                return [...prev, ...curr.results]
              }, [])
              return list
            })
          )
        } else {
          this.list$ = of([])
          this.showSearch = false
        }
      });


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
        this.dataAvailable = true
      })
  }

  navigateRes(result: any) {
    if (result?.read_time) {
      this.router.navigate(['edu/reports', result?.id])
    } else {
      this.router.navigate(['edu/videos', result?.id])
    }
  }

  navigateRoute(path: string){
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

  toggleSearch() {
    this.showSearch != this.showSearch
  }

  dropdownToggle() {
    this.dropdown = !this.dropdown
  }

  logout() {
    this.dropdown = false
    this.store.dispatch(RemoveToken)
  }
}
