import { Component } from '@angular/core';
import { ListAbstract } from '@core/abstract/list.abstract';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { ListResponseModel } from '@core/models/api/list.model';
import { ReportModel } from '@core/models/api/report.model';
import { ReportsService } from '@core/services/reports.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-profile-reports',
  templateUrl: './profile-reports.component.html',
  styleUrls: ['./profile-reports.component.scss'],
  animations: [opacityAnimation]
})
export class ProfileReportsComponent extends ListAbstract<ReportModel> {

  constructor(
    protected reportService: ReportsService
  ) {
    super();
  }
  get listAction(): Observable<ListResponseModel<ReportModel>> {
    return this.reportService.listSaved(this.params)
  }
}
