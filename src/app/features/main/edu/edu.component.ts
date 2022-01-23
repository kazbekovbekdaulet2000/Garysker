import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MainState } from '../main.state';
import { Select, Store } from '@ngxs/store'
import { ListReports, ListVideos } from '../main.actions';
import { VideoModel } from '@core/models/api/video.model';
import { ReportModel } from '@core/models/api/report.model';
import { ListResponseModel } from '@core/models/api/list.model';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { heightAnimation } from '@core/animations/height-animation';

@Component({
  templateUrl: './edu.component.html',
  styleUrls: ['./edu.component.scss'],
  animations: [opacityAnimation, heightAnimation]
})
export class EduComponent {

  @Select(MainState.reports) reports$!: Observable<ListResponseModel<ReportModel>>;
  @Select(MainState.videos) videos$!: Observable<ListResponseModel<VideoModel>>;

  constructor(
    private store: Store,
    private router: Router,
  ) {
    this.store.dispatch(new ListReports())
    this.store.dispatch(new ListVideos())
  }

  get image(): string {
    return ""
  }
}
