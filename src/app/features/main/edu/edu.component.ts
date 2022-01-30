import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store'
import { VideoModel } from '@core/models/api/video.model';
import { ReportModel } from '@core/models/api/report.model';
import { ListResponseModel } from '@core/models/api/list.model';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { heightAnimation } from '@core/animations/height-animation';
import { ReportState } from './report-module/report.state';
import { VideoState } from './video-module/video.state';
import { ListReports } from './report-module/report.actions';
import { ListVideos } from './video-module/video.actions';
import { MainState } from '../main.state';
import { ClearPopular } from '../main.actions';

@Component({
  templateUrl: './edu.component.html',
  styleUrls: ['./edu.component.scss'],
  animations: [opacityAnimation, heightAnimation]
})
export class EduComponent implements OnDestroy{

  @Select(ReportState.reports) reports$!: Observable<ListResponseModel<ReportModel>>;
  @Select(VideoState.videos) videos$!: Observable<ListResponseModel<VideoModel>>;
  @Select(MainState.popular) popular$!: Observable<any>;

  constructor(
    private store: Store,
    private router: Router
  ) {
    this.store.dispatch([ListReports, ListVideos])
  }

  ngOnDestroy(): void {
    this.store.dispatch(ClearPopular)
  }

  onNavigate(item: any){
    if(item?.read_time){
      this.router.navigate(['edu/reports', item?.id])
    }else{
      this.router.navigate(['edu/videos', item?.id])
    }
  }
}
