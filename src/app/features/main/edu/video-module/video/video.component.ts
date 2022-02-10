import { Component, ElementRef, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoDetailModel } from '@core/models/api/video.model';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ClearVideoDetail, GetVideo } from '../video.actions';
import { VideoState } from '../video.state';

@Component({
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnDestroy {

  @Select(VideoState.video) video$!: Observable<VideoDetailModel>
  @ViewChild('plyr') plyr!: ElementRef;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.store.dispatch(new GetVideo(id))
    })
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ClearVideoDetail)
  }
}
