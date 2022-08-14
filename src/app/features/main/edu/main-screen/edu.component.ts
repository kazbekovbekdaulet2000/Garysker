import { Select, Store } from '@ngxs/store'
import { VideoModel } from '@core/models/api/video.model';
import { ReportModel } from '@core/models/api/report.model';
import { emptyListResponse, ListResponseModel } from '@core/models/api/list.model';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { heightAnimation } from '@core/animations/height-animation';
import { filter } from 'rxjs/operators';
import { UpdateTop } from '@core/states/scroll/scroll';
import { ScrollState } from '@core/states/scroll/scroll.state';
import { ChangeCategory } from '../../main.actions';
import { MainState } from '../../main.state';
import { ReportState } from '../report-module/report.state';
import { VideoState } from '../video-module/video.state';
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { ClearReportList } from '../report-module/report.actions';
import { ClearVideoList } from '../video-module/video.actions';
import { AppState } from '@core/states/app/app.state';
import { CategoryModel } from '@core/models/api/category.model';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: './edu.component.html',
  styleUrls: ['./edu.component.scss'],
  animations: [opacityAnimation, heightAnimation],
})
export class EduComponent implements AfterViewInit, OnDestroy {

  @Select(ReportState.reports) reports$!: Observable<ListResponseModel<ReportModel>>;
  @Select(VideoState.videos) videos$!: Observable<ListResponseModel<VideoModel>>;
  @Select(MainState.selectedCategory) selectedCategory$!: Observable<number>;
  @Select(AppState.categories) categories$!: Observable<CategoryModel[]>;
  @Select(ScrollState.top) top$!: Observable<number>;

  show_info: boolean = false;
  popular: any[] = [];

  constructor(
    private store: Store,
    private meta: Meta,
    private title: Title,
    private translate: TranslateService
  ) {
    const categoryId = this.store.selectSnapshot(MainState.selectedCategory)
    this.store.dispatch(new ChangeCategory(categoryId))

    this.translate.get('main_screen.description').subscribe(desc => {
      this.title.setTitle("Garyshker")
      this.meta.updateTag({ name: 'keywords', content: "asd, asd, asd" })
      this.meta.updateTag({ name: 'description', content: desc })
      this.meta.updateTag({ property: 'og:description', content: desc })
      this.meta.updateTag({ property: 'twitter:description', content: desc })
      this.meta.updateTag({ name: 'robots', content: 'index, follow' })
      this.meta.updateTag({ name: 'author', content: "Garyshker" })
      this.meta.updateTag({ name: 'brand', content: 'Garyshker' })
      this.meta.updateTag({ property: "og:url", content: location.href })
      this.meta.updateTag({ property: 'og:type', content: 'website' })
      this.meta.updateTag({ name: 'twitter:title', content: "Garyshker" })
      this.meta.updateTag({ property: 'og:title', content: "Garyshker" })
      this.meta.updateTag({ property: 'og:image', content: "https://app.garyshker-app.kz/media/garysh.jpg" })
      this.meta.updateTag({ property: 'image', content: "https://app.garyshker-app.kz/media/garysh.jpg" })
      this.meta.updateTag({ name: 'twitter:image', content: "https://app.garyshker-app.kz/media/garysh.jpg" })
    })

    combineLatest([
      this.reports$,
      this.videos$
    ]).pipe(
      filter(([reports, videos]) => reports !== emptyListResponse && videos !== emptyListResponse)
    ).subscribe(([reports, videos]) => {
      const list = [...reports.results, ...videos.results]
      this.popular = list.sort((a: any, b: any) => (a.views < b.views) ? 1 : ((b.views < a.views) ? -1 : 0)).slice(0, 10)
    })
  }

  ngAfterViewInit(): void {
    this.top$.subscribe(top => {
      window.scrollTo(0, top)
    })
    this.store.dispatch(new UpdateTop(0))
  }

  ngOnDestroy(): void {
    this.store.dispatch([ClearReportList])
  }

  removeRouteCategory() {
    this.updateContent(NaN)
  }

  onShow() {
    this.show_info = !this.show_info
  }

  updateContent(id: number) {
    this.store.dispatch([ClearReportList, ClearVideoList])

    const categoryId = this.store.selectSnapshot(MainState.selectedCategory)
    if (categoryId !== id) {
      this.store.dispatch(new ChangeCategory(id))
    } else {
      this.store.dispatch(new ChangeCategory(NaN))
    }
  }
}
