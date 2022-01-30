import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoDetailModel } from '@core/models/api/video.model';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetVideo } from '../video.actions';
import { VideoState } from '../video.state';

@Component({
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent{

  @Select(VideoState.video) video$!: Observable<VideoDetailModel>

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.store.dispatch(new GetVideo(id))
    })
  }
}
