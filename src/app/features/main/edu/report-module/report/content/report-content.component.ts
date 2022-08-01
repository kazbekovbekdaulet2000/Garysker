import { Component, Input } from '@angular/core';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { ReportDetailModel } from '@core/models/api/report.model';

@Component({
  selector: 'app-report-content',
  templateUrl: './report-content.component.html',
  styleUrls: ['./report-content.component.scss'],
  animations: [opacityAnimation, heightAnimation]
})
export class ReportContentComponent {
  @Input() report: ReportDetailModel

  onComment() {
    
  }

  onSave(id: number) {

  }

  onShare(){

  }

  likeReport(id: number){

  }
}
