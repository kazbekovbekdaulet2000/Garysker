import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListResponseModel } from '@core/models/api/list.model';
import { ReportModel } from '@core/models/api/report.model';
import { ReportsService } from '@core/services/reports.service';
import { Store } from '@ngxs/store';
import { ClearReportDetail, GetRelatedReports } from '../../report.actions';

@Component({
  selector: 'app-report-related',
  templateUrl: './related.component.html',
  styleUrls: ['./related.component.scss']
})
export class ReportRelatedComponent {

  @Input() reportId!: number
  page: number = 1;

  reports!: ListResponseModel<ReportModel>

  params: any = {
    page: 1
  }

  constructor(
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private reportService: ReportsService
  ) {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.reportService.getRelated(id, this.params)
        .subscribe(related_reports => {
          this.reports = related_reports
        })
    })
  }

  navigateReport(id: number) {
    this.store.dispatch(ClearReportDetail)
    this.router.navigate(['/edu/reports', id])
  }

  onScroll(event: boolean) {
    if (!!this.reports.next && event) {
      this.params.page++
      this.reportService.getRelated(this.reportId, this.params)
        .subscribe(related_reports => {
          this.reports = { ...related_reports, results: [...this.reports.results, ...related_reports.results] }
        })
    }
  }

}
