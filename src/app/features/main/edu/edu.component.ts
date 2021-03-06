import { AfterContentChecked, AfterViewInit, Component, ElementRef, OnDestroy, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, fromEvent, Observable, Subscription } from 'rxjs';
import { Select, Store } from '@ngxs/store'
import { VideoModel } from '@core/models/api/video.model';
import { ReportModel } from '@core/models/api/report.model';
import { ListResponseModel } from '@core/models/api/list.model';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { heightAnimation } from '@core/animations/height-animation';
import { ReportState } from './report-module/report.state';
import { VideoState } from './video-module/video.state';
import { ClearVideoList, ListMoreVideos } from './video-module/video.actions';
import { MainState } from '../main.state';
import { ChangeCategory } from '../main.actions';
import { SidebarState } from '@core/states/sidebar/sidebar.state';
import { CategoryModel } from '@core/models/api/category.model';
import 'swiper/swiper.scss'
import SwiperCore, { Autoplay, Navigation, Scrollbar, Mousewheel, SwiperOptions } from "swiper";
import { ClearReportList, ListMoreReports } from './report-module/report.actions';
import { filter, map } from 'rxjs/operators';
import { UpdateTop } from '@core/states/scroll/scroll';
import { ScrollState } from '@core/states/scroll/scroll.state';
import { AppState } from '@core/states/app/app.state';

SwiperCore.use([Autoplay, Navigation, Scrollbar, Mousewheel]);

@Component({
  templateUrl: './edu.component.html',
  styleUrls: ['./edu.component.scss'],
  animations: [opacityAnimation, heightAnimation],
  encapsulation: ViewEncapsulation.None,
})
export class EduComponent implements AfterViewInit, OnDestroy {

  @Select(ReportState.reports) reports$!: Observable<ListResponseModel<ReportModel>>;
  @Select(VideoState.videos) videos$!: Observable<ListResponseModel<VideoModel>>;
  @Select(MainState.selectedCategory) selectedCategory$!: Observable<number>
  @Select(AppState.categories) categories$!: Observable<CategoryModel[]>;

  @Select(ScrollState.top) top$!: Observable<number>;

  @ViewChildren('image') images!: QueryList<ElementRef>;
  @ViewChildren('imageHolder') imageHolder!: QueryList<ElementRef>;
  @ViewChild('swiper', { static: false }) swiper: any;

  config!: SwiperOptions;
  show_info: boolean = false;
  resizeObservable$!: Observable<Event>;
  resizeSubscription$!: Subscription;
  popular$!: Observable<any[]>;
  cellCount: number = window.innerWidth > 1200 ? 2 : (window.innerWidth > 640 ? 2 : 1);

  constructor(
    private store: Store,
    private router: Router
  ) {
    this.resizeObservable$ = fromEvent(window, 'resize')

    this.resizeSubscription$ = this.resizeObservable$.subscribe((evt: any) => {
      if (Number(evt.target?.innerWidth) < 640) {
        this.cellCount = 1
        return
      }
      if (Number(evt.target?.innerWidth) < 1200) {
        this.cellCount = 2
        return
      }
      this.cellCount = 2
    })

    const categoryId = this.store.selectSnapshot(MainState.selectedCategory)
    this.store.dispatch(new ChangeCategory(categoryId))

    this.popular$ = combineLatest([this.reports$, this.videos$])
      .pipe(
        filter(list => {
          return list.reduce((prev: boolean, curr: any) => {
            return prev && curr.results.length > 0
          }, true)
        }),
        map(list => {
          const new_list = list.reduce((prev: any, curr: any) => {
            return [...prev, ...curr.results]
          }, [])
          new_list.sort((a, b) => (a.views < b.views) ? 1 : ((b.views < a.views) ? -1 : 0))
          return new_list
        })
      )

    this.popular$.subscribe(data => {
      this.config = {
        spaceBetween: 24,
        loop: true,
        loopedSlides: data?.length,
        initialSlide: 0,
        observer: true,
        autoplay: {
          delay: 5000
        },
        centeredSlides: true,
        navigation: true,
        direction: 'horizontal',
      };
    })
  }
  ngAfterViewInit(): void {
    this.top$.subscribe(top => {
      window.scrollTo(0, top)
    })
    this.store.dispatch(new UpdateTop(0))
  }

  onScroll() {
    this.store.dispatch(ListMoreReports)
  }

  slideNext() {
    this.swiper.swiperRef.slideNext();
  }
  slidePrev() {
    this.swiper.swiperRef.slidePrev();
  }

  ngOnDestroy(): void {
    this.store.dispatch(ClearReportList)
  }

  onNavigate(item: any) {
    if (item?.read_time) {
      this.router.navigate(['edu/reports', item?.id])
    } else {
      this.router.navigate(['edu/videos', item?.id])
    }
  }

  removeRouteCategory() {
    this.updateContent(NaN)
  }

  onShow() {
    this.show_info = !this.show_info
  }

  updateContent(id: number) {
    this.store.dispatch(ClearReportList)
    this.store.dispatch(ClearVideoList)

    const categoryId = this.store.selectSnapshot(MainState.selectedCategory)
    if (categoryId !== id) {
      this.store.dispatch(new ChangeCategory(id))
    } else {
      this.store.dispatch(new ChangeCategory(NaN))
    }
  }

  loadVideo(next: string) {
    const categoryId = this.store.selectSnapshot(MainState.selectedCategory)
    const pageNumber = Number(next.split('page=')[1])
    let params = { page: pageNumber }
    if (categoryId) {
      params = { ...params, ...{ category: categoryId } }
    }
    this.store.dispatch(new ListMoreVideos(params))
  }

  onVideoRoute(id: number) {
    this.store.dispatch(new UpdateTop(document.documentElement.scrollTop))
    this.router.navigate(['edu/videos', id])
  }

  onReportRoute(id: number) {
    this.store.dispatch(new UpdateTop(document.documentElement.scrollTop))
    this.router.navigate(['edu/reports', id])
  }
}
