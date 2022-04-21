import { Select, Store } from '@ngxs/store'
import { VideoModel } from '@core/models/api/video.model';
import { ReportModel } from '@core/models/api/report.model';
import { ListResponseModel } from '@core/models/api/list.model';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { heightAnimation } from '@core/animations/height-animation';
import { filter, map } from 'rxjs/operators';
import { UpdateTop } from '@core/states/scroll/scroll';
import { ScrollState } from '@core/states/scroll/scroll.state';
import { ChangeCategory } from '../../main.actions';
import { MainState } from '../../main.state';
import { ReportState } from '../report-module/report.state';
import { VideoState } from '../video-module/video.state';
import { Component, ViewEncapsulation, AfterViewInit, OnDestroy } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { ClearReportList } from '../report-module/report.actions';
import { ClearVideoList } from '../video-module/video.actions';
import { AppState } from '@core/states/app/app.state';
import { CategoryModel } from '@core/models/api/category.model';
import { ClearCourseList } from '../course-module/course.actions';


@Component({
  templateUrl: './edu.component.html',
  styleUrls: ['./edu.component.scss'],
  animations: [opacityAnimation, heightAnimation],
  encapsulation: ViewEncapsulation.None,
})
export class EduComponent implements AfterViewInit, OnDestroy {

  @Select(ReportState.reports) reports$!: Observable<ListResponseModel<ReportModel>>;
  @Select(VideoState.videos) videos$!: Observable<ListResponseModel<VideoModel>>;
  @Select(MainState.selectedCategory) selectedCategory$!: Observable<number>;
  @Select(AppState.categories) categories$!: Observable<CategoryModel[]>;
  @Select(ScrollState.top) top$!: Observable<number>;

  show_info: boolean = false;
  popular$!: Observable<any[]>;

  constructor(
    private store: Store,
  ) {
    const categoryId = this.store.selectSnapshot(MainState.selectedCategory)
    this.store.dispatch(new ChangeCategory(categoryId))

    this.popular$ = combineLatest([this.reports$, this.videos$]).pipe(
      filter((list: any) => {
        return list.reduce((prev: boolean, curr: any) => {
          return prev && curr.results.length > 0
        }, true)
      }),
      map((list: any) => {
        const new_list = list.reduce((prev: any, curr: any) => {
          return [...prev, ...curr.results]
        }, [])
        new_list.sort((a: any, b: any) => (a.views < b.views) ? 1 : ((b.views < a.views) ? -1 : 0))
        return new_list
      })
    )
  }

  ngAfterViewInit(): void {
    this.top$.subscribe(top => {
      window.scrollTo(0, top)
    })
    this.store.dispatch(new UpdateTop(0))
  }

  ngOnDestroy(): void {
    this.store.dispatch([ClearReportList, ClearCourseList])
  }

  removeRouteCategory() {
    this.updateContent(NaN)
  }

  onShow() {
    this.show_info = !this.show_info
  }

  updateContent(id: number) {
    this.store.dispatch([ClearReportList, ClearCourseList, ClearVideoList])

    const categoryId = this.store.selectSnapshot(MainState.selectedCategory)
    if (categoryId !== id) {
      this.store.dispatch(new ChangeCategory(id))
    } else {
      this.store.dispatch(new ChangeCategory(NaN))
    }
  }
}
