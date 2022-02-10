import { Component, Input } from '@angular/core';
import { ReportDetailModel } from '@core/models/api/report.model';

@Component({
  selector: 'app-report-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class ReportMenuComponent {

  @Input() report!: ReportDetailModel;

  constructor() { }

}
