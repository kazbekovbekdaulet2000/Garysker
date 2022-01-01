import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MainState } from '../main.state';
import { Select, Store } from '@ngxs/store'
import { ListReports, ListVideos } from '../main.actions';
import { VideoModel } from '@core/models/api/video.model';
import { ReportModel } from '@core/models/api/report.model';

@Component({
  templateUrl: './edu.component.html',
  styleUrls: ['./edu.component.scss']
})
export class EduComponent {

  @Select(MainState.reports) reports$!: Observable<ReportModel[]>;
  @Select(MainState.videos) videos$!: Observable<VideoModel[]>;

  constructor(
    private store: Store,
    private router: Router,
  ) {
    this.store.dispatch(new ListReports())
    this.store.dispatch(new ListVideos())
  }

  @HostListener('window:scroll')
  onScroll(): void {

  }

  get image(): string {
    return ""
  }
}
