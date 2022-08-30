import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, } from 'rxjs';
import { Store } from '@ngxs/store'
import { ReportModel } from '@core/models/api/report.model';
import { emptyListResponse, ListResponseModel } from '@core/models/api/list.model';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { heightAnimation } from '@core/animations/height-animation';
import { UpdateTop } from '@core/states/scroll/scroll';
import { CarouselComponent } from 'src/app/shared/components/swiper/swiper.component';
import { ListAbstract } from '@core/abstract/list.abstract';
import { ReportsService } from '@core/services/reports.service';
import { switchMap } from 'rxjs/operators';
import { CategoriesService } from '@core/services/categories.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  animations: [opacityAnimation, heightAnimation],
})
export class EduReportsComponent extends ListAbstract<ReportModel> implements OnDestroy {

  @ViewChild(CarouselComponent) carousel: CarouselComponent | undefined

  constructor(
    private store: Store,
    private router: Router,
    private reportsService: ReportsService,
    private categoriesService: CategoriesService
  ) {
    super();
  }

  get listAction(): Observable<ListResponseModel<ReportModel>> {
    return this.categoriesService.selectedCategory$.pipe(switchMap(category => {
      let params = this.params
      if (category) {
        params = { ...params, category }
      }
      return this.reportsService.list(params)
    }))
  }

  onReportRoute(id: number) {
    this.store.dispatch(new UpdateTop(document.documentElement.scrollTop))
    this.router.navigate(['edu/reports', id])
  }

  ngOnDestroy(): void {
    this.list = emptyListResponse;
    this.category_sub.unsubscribe();
    if (this.list_sub) {
      this.list_sub.unsubscribe();
    }
    this.reportsService.clear();
  }
}
