import { Component } from '@angular/core';
import { ListAbstract } from '@core/abstract/list.abstract';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { ListResponseModel } from '@core/models/api/list.model';
import { VideoModel } from '@core/models/api/video.model';
import { VideosService } from '@core/services/videos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-videos',
  templateUrl: './profile-videos.component.html',
  styleUrls: ['./profile-videos.component.scss'],
  animations: [opacityAnimation, heightAnimation]
})
export class ProfileVideosComponent extends ListAbstract<VideoModel> {

  constructor(
    protected videosService: VideosService
  ) {
    super();
  }

  get listAction(): Observable<ListResponseModel<VideoModel>> {
    return this.videosService.listSaved(this.params)
  }
}
