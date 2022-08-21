import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListAbstract } from '@core/abstract/list.abstract';
import { emptyListResponse, ListResponseModel } from '@core/models/api/list.model';
import { ReportModel } from '@core/models/api/report.model';
import { ReportsService } from '@core/services/reports.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-report-related',
  templateUrl: './related.component.html',
  styleUrls: ['./related.component.scss']
})
export class ReportRelatedComponent extends ListAbstract<ReportModel> {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private reportService: ReportsService
  ) {
    super();
  }

  get listAction(): Observable<ListResponseModel<ReportModel>> {
    return this.activatedRoute.params.pipe(switchMap(params=>{
      return this.reportService.getRelated(+params.id, this.params)
    }))
  }

  navigateReport(id: number) {
    this.router.navigate(['/edu/reports', id])
    this.list = emptyListResponse;
  }
}
