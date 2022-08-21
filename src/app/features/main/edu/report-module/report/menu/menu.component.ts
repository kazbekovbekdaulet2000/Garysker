import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ReportDetailModel } from '@core/models/api/report.model';
import { CategoriesService } from '@core/services/categories.service';

@Component({
  selector: 'app-report-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class ReportMenuComponent {

  @Input() report: ReportDetailModel;

  constructor(
    private router: Router,
    public categoriesService: CategoriesService
  ) { }

  navigateEdu(categoryId: number) {
    this.categoriesService.changeCategory(categoryId)
    this.router.navigate(['/edu'])
  }
}
