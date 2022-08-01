import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ReportDetailModel } from '@core/models/api/report.model';
import { Store } from '@ngxs/store';
import { ChangeCategory } from 'src/app/features/main/main.actions';

@Component({
  selector: 'app-report-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class ReportMenuComponent {

  @Input() report: ReportDetailModel;

  constructor(
    private store: Store,
    private router: Router
  ) { }

  navigateEdu(category: number) {
    this.store.dispatch(new ChangeCategory(category))
    this.router.navigate(['/edu'])
  }
}
