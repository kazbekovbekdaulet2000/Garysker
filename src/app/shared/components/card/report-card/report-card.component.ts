import { Component, Input } from '@angular/core';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { ReportModel } from '@core/models/api/report.model';


@Component({
  selector: 'report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.scss'],
  animations: [opacityAnimation]
})
export class CardComponent {

  @Input() report!: ReportModel;

  constructor(
  ) { }
}
