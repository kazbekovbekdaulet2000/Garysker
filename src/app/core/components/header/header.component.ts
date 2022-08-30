import { Component, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { heightOutAnimation } from '@core/animations/height-out-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { UserModel } from '@core/models/api/user.model';
import { ReportsService } from '@core/services/reports.service';
import { VideosService } from '@core/services/videos.service';
import { AppState } from '@core/states/app/app.state';
import { AuthState } from '@core/states/auth/auth.state';
import { Select, Store } from '@ngxs/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';
import { LinkShareModalComponent } from 'src/app/shared/modals/share-modal/share-modal.component';

@Component({
  selector: 'app-core-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [opacityAnimation, heightOutAnimation],
})
export class HeaderComponent implements OnInit, OnDestroy {

  main = '';
  innerWidth: number = window.innerWidth;
  dropdown: boolean = false;
  sideBar: boolean = false;
  dataAvailable: boolean = false;
  userMenu: boolean = false;

  @Select(AuthState.access) access$!: Observable<string>;
  @Select(AuthState.profile) profile$!: Observable<UserModel>;
  @Select(AuthState.authorized) authorized$!: Observable<boolean>;

  @ViewChild('toggleDiv') toggleDiv: ElementRef | any;
  @ViewChild('menu') menu: ElementRef | any;

  showSearch: boolean = false

  private unsubscriber = new Subject<void>();
  searchText = new FormControl('');

  list$!: Observable<any[]>
  @Output() sidenav: EventEmitter<boolean> = new EventEmitter(false);

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  constructor(
    private router: Router,
    private store: Store,
    private renderer: Renderer2,
    private reportService: ReportsService,
    private videoService: VideosService,
    private bsModalService: BsModalService
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.menu) {
        if (e.target !== this.toggleDiv.nativeElement && e.target !== this.menu?.nativeElement) {
          this.dropdown = false;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  ngOnInit(): void {
    const lang = this.store.selectSnapshot(AppState.lang)
    this.searchText.valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        takeUntil(this.unsubscriber)
      )
      .subscribe(value => {
        if (value !== '') {
          this.showSearch = true
          const search = lang === 'ru' ? { title_ru: value } : { title_kk: value }
          this.list$ = combineLatest([
            this.reportService.list(search),
            this.videoService.list(search)
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
          case route.urlAfterRedirects.includes('profile'):
            this.main = 'profile'
            break;
          case route.urlAfterRedirects.includes('application'):
            this.main = 'application'
            break;
          case route.urlAfterRedirects.includes('auth'):
            this.main = 'auth';
            break;
          case route.urlAfterRedirects.includes('videos'):
            this.main = 'videos'
            break;
          case route.urlAfterRedirects.includes('reports'):
            this.main = 'reports'
            break;
          case route.urlAfterRedirects.includes('edu'):
            this.main = 'edu'
            break;
          case route.urlAfterRedirects.includes('projects'):
            this.main = 'projects'
            break;
          case route.urlAfterRedirects.includes('events'):
            this.main = 'events'
            break;
          case route.urlAfterRedirects.includes('shop'):
            this.main = 'shop'
            break;
          case route.urlAfterRedirects.includes('about'):
            this.main = 'about'
            break;
          default:
            this.main = '';
        }
      })
  }

  navigateRes(result: any) {
    if ('read_time_kk' in result || 'read_time_ru' in result) {
      this.router.navigate(['edu/reports', result?.id])
    } else {
      this.router.navigate(['edu/videos', result?.id])
    }
  }

  navigateRoute(path: string) {
    this.router.navigate([path])
  }

  toggleSearch() {
    this.showSearch = !this.showSearch
  }

  dropdownToggle() {
    this.dropdown = !this.dropdown
  }

  triggerMenu() {
    this.userMenu = !this.userMenu
  }

  shareLink(){
    this.bsModalService.show(LinkShareModalComponent, { class: 'modal-dialog-centered' })
  }

  get isReportOrVideo(): boolean {
    return ['reports', 'videos'].includes(this.main)
  }
}
