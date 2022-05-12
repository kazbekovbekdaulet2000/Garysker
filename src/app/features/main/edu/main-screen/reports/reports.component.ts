import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, } from 'rxjs';
import { Select, Store } from '@ngxs/store'
import { ReportModel } from '@core/models/api/report.model';
import { ListResponseModel } from '@core/models/api/list.model';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { heightAnimation } from '@core/animations/height-animation';
import { UpdateTop } from '@core/states/scroll/scroll';
import { ListMoreReports } from '../../report-module/report.actions';
import { ReportState } from '../../report-module/report.state';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  animations: [opacityAnimation, heightAnimation],
})
export class EduReportsComponent {

  @Select(ReportState.reports) reports$!: Observable<ListResponseModel<ReportModel>>;
  constructor(
    private store: Store,
    private router: Router,
  ) { }

  onScroll() {
    this.store.dispatch(ListMoreReports)
  }

  onReportRoute(id: number) {
    this.store.dispatch(new UpdateTop(document.documentElement.scrollTop))
    this.router.navigate(['edu/reports', id])
  }
}
