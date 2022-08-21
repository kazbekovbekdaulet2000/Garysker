import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { ListResponseModel } from '@core/models/api/list.model';
import { ReportModel } from '@core/models/api/report.model';
import { UserModel } from '@core/models/api/user.model';
import { VideoModel } from '@core/models/api/video.model';
import { RemoveToken, UpdateProfile } from '@core/states/auth/actions';
import { AuthState } from '@core/states/auth/auth.state';
import { Select, Store } from '@ngxs/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ProfileChangeModalComponent } from './profile-change-modal/profile-change-modal.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [opacityAnimation, heightAnimation]
})
export class ProfileComponent implements AfterViewInit {
  @Select(AuthState.profile) profile$: Observable<UserModel>;
  
  constructor(
    private store: Store,
    private bsModalService: BsModalService
  ) { }

  ngAfterViewInit(): void {
    this.store.dispatch(new UpdateProfile());
  }

  logout() {
    this.store.dispatch(RemoveToken);
  }

  onProfileChange() {
    this.bsModalService.show(ProfileChangeModalComponent, {
      class: 'modal-dialog-centered modal-lg'
    });
  }
}
