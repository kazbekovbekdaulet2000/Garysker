import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ListResponseModel } from '@core/models/api/list.model';
import { ReportModel } from '@core/models/api/report.model';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ClearReportDetail, GetRelatedReports } from '../../report.actions';
import { ReportState } from '../../report.state';

@Component({
  selector: 'app-report-related',
  templateUrl: './related.component.html',
  styleUrls: ['./related.component.scss']
})
export class ReportRelatedComponent {

  @Input() reportId!: number
  @Select(ReportState.reports_related) reports$!: Observable<ListResponseModel<ReportModel>>
  page: number = 1;

  constructor(
    private store: Store,
    private router: Router
  ) { }

  navigateReport(id: number) {
    this.store.dispatch(ClearReportDetail)
    this.router.navigate(['/edu/reports', id])
  }

  onScroll() {
    this.reports$.subscribe(data => {
      if (data.next) {
        const page = data.next.split('page=')[1]
        this.store.dispatch(new GetRelatedReports(this.reportId, { page: page }))
      }
    })
  }

}
