import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryModel } from '@core/models/api/category.model';
import { ReportDetailModel } from '@core/models/api/report.model';
import { SidebarState } from '@core/states/sidebar/sidebar.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { ChangeCategory } from 'src/app/features/main/main.actions';

@Component({
  selector: 'app-report-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class ReportMenuComponent {

  @Input() report!: ReportDetailModel;
  @Select(SidebarState.categories) categories$!: Observable<CategoryModel[]>

  constructor(
    private store: Store,
    private router: Router
  ) { }

  navigateEdu(item: string) {
    this.categories$.subscribe(list => {
      const category = list.find(val => val.name === item)
      this.store.dispatch(new ChangeCategory(category!.id))
      this.router.navigate(['/edu'])
    })
  }
}
