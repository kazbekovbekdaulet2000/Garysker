import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { ListResponseModel } from '@core/models/api/list.model';
import { ReportModel } from '@core/models/api/report.model';
import { UserModel } from '@core/models/api/user.model';
import { VideoModel } from '@core/models/api/video.model';
import { RemoveToken } from '@core/states/auth/actions';
import { AuthState } from '@core/states/auth/auth.state';
import { Select, Store } from '@ngxs/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ListSavedReports } from '../edu/report-module/report.actions';
import { ReportState } from '../edu/report-module/report.state';
import { ListSavedVideos } from '../edu/video-module/video.actions';
import { VideoState } from '../edu/video-module/video.state';
import { ProfileChangeModalComponent } from './profile-change-modal/profile-change-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [opacityAnimation]
})
export class MainProfileComponent implements OnInit {

  profile: UserModel | null | undefined;
  @Select(ReportState.reports) reports$!: Observable<ListResponseModel<ReportModel>>;
  @Select(VideoState.videos) videos$!: Observable<ListResponseModel<VideoModel>>;

  constructor(
    private store: Store,
    private router: Router,
    private bsModalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.profile = this.store.selectSnapshot(AuthState.profile)
    this.store.dispatch([ListSavedReports, ListSavedVideos])
  }

  logout() {
    this.store.dispatch(RemoveToken)
  }

  onProfileChange(){
    this.bsModalService.show(ProfileChangeModalComponent,  { class: 'modal-dialog-centered modal-lg' })
  }

  onReport(item: any){
    this.router.navigate(['edu/reports', item.id])
  }

  onVideo(item: any){
    this.router.navigate(['edu/videos', item.id])
  }  
}
