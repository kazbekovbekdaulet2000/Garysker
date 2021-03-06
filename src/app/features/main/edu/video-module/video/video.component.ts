import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ListResponseModel } from '@core/models/api/list.model';
import { VideoDetailModel, VideoModel } from '@core/models/api/video.model';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ClearRelatedVideoList, ClearVideoComments, ClearVideoDetail, GetVideo, ListRelatedVideos, ListVideoComments } from '../video.actions';
import { VideoState } from '../video.state';

@Component({
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnDestroy {

  @Select(VideoState.video) video$!: Observable<VideoDetailModel>
  @Select(VideoState.related_videos) videos$!: Observable<ListResponseModel<VideoModel>>

  @ViewChild('plyr') plyr!: ElementRef;
  videoId: number = NaN;
  showTitle: boolean = window.innerWidth > 1000 ? false : true;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.ngOnDestroy()
    })
    this.activatedRoute.params.subscribe(({ id }) => {
      this.videoId = id
      this.store.dispatch(new GetVideo(id))
      this.store.dispatch(new ListRelatedVideos(id, { page: 1 }))
      this.store.dispatch(new ListVideoComments(id))
    })
  }

  ngOnDestroy(): void {
    this.store.dispatch([ClearVideoDetail, ClearRelatedVideoList, ClearVideoComments])
  }

  navigateVideo(id: number) {
    this.router.navigate(['/edu/videos', id])
    this.ngOnDestroy()
  }

  loadVideo(next: string) {
    if (next) {
      const pageNumber = Number(next.split('page=')[1])
      this.store.dispatch(new ListRelatedVideos(this.videoId, { page: pageNumber }))
    }
  }
}
