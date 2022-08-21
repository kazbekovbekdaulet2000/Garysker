import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { heightOutAnimation } from '@core/animations/height-out-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { ReportsService } from '@core/services/reports.service';
import { VideosService } from '@core/services/videos.service';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss'],
  animations: [opacityAnimation, heightOutAnimation],
})
export class HeaderSearchComponent implements OnInit, OnDestroy {

  main = '';
  @ViewChild('search') search: ElementRef | any;

  showSearch: boolean = false

  private unsubscriber = new Subject<void>();
  searchText = new FormControl('');

  list$!: Observable<any[]>

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private reportService: ReportsService,
    private videoService: VideosService,
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
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
        debounceTime(100),
        distinctUntilChanged(),
        takeUntil(this.unsubscriber)
      )
      .subscribe(value => {
        if (value !== '') {
          this.showSearch = true
          const search = { search: value }
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
          case route.url.includes('application'):
            this.main = 'application'
            break;
          case route.url.includes('auth'):
            this.main = 'auth';
            break;
          default:
            this.main = '';
        }
      })
  }

  navigateRes(result: any) {
    if (result?.read_time) {
      this.router.navigate(['edu/reports', result?.id])
    } else {
      this.router.navigate(['edu/videos', result?.id])
    }
  }

  toggleSearch() {
    this.showSearch != this.showSearch
  }
}
