import { Select, Store } from '@ngxs/store'
import { emptyListResponse } from '@core/models/api/list.model';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { heightAnimation } from '@core/animations/height-animation';
import { filter, take, delay } from 'rxjs/operators';
import { UpdateTop } from '@core/states/scroll/scroll';
import { ScrollState } from '@core/states/scroll/scroll.state';
import { Component, AfterViewInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { AppState } from '@core/states/app/app.state';
import { CategoryModel } from '@core/models/api/category.model';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@env';
import { ReportsService } from '@core/services/reports.service';
import { VideosService } from '@core/services/videos.service';
import { CategoriesService } from '@core/services/categories.service';
import { LoaderState } from '@core/states/loader/loader.state';

@Component({
  templateUrl: './edu.component.html',
  styleUrls: ['./edu.component.scss'],
  animations: [opacityAnimation, heightAnimation],
})
export class EduComponent implements AfterViewInit {
  loading: boolean = false;
  @Select(AppState.categories) categories$: Observable<CategoryModel[]>;
  @Select(ScrollState.top) top$: Observable<number>;

  show_info: boolean = false;
  popular: any[] = [];

  constructor(
    private store: Store,
    private meta: Meta,
    private title: Title,
    private translate: TranslateService,
    private reportsService: ReportsService,
    private videosService: VideosService,
    public categoriesService: CategoriesService
  ) {
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
      this.reportsService._list$,
      this.videosService._list$
    ]).pipe(
      filter(([reports, videos]) => reports !== emptyListResponse && videos !== emptyListResponse)
    ).subscribe(([reports, videos]) => {
      const list = [...reports.results, ...videos.results]
      this.popular = list.sort((a: any, b: any) => (a.views < b.views) ? 1 : ((b.views < a.views) ? -1 : 0))
    })

    this.store.select(LoaderState.loading)
      .pipe(filter(ans => ans === true), delay(500))
      .subscribe(() => {
        this.loading = true
      })
  }

  ngAfterViewInit(): void {
    this.top$.subscribe(top => {
      window.scrollTo(0, top)
    })
    this.store.dispatch(new UpdateTop(0))
  }

  removeRouteCategory() {
    this.categoriesService.changeCategory(NaN)
  }

  onShow() {
    this.show_info = !this.show_info
  }

  get isProd(): boolean {
    return environment.production
  }
}
