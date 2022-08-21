import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListAbstract } from '@core/abstract/list.abstract';
import { emptyListResponse, ListResponseModel } from '@core/models/api/list.model';
import { VideoModel } from '@core/models/api/video.model';
import { VideosService } from '@core/services/videos.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-video-related',
  templateUrl: './video-related.component.html',
  styleUrls: ['./video-related.component.scss'],
})
export class VideoRelatedComponent extends ListAbstract<VideoModel> {
  
  constructor(
    private router: Router,
    private videosService: VideosService,
    private activatedRoute: ActivatedRoute
  ) {
    super();
    this.page_size = 5
  }

  navigateVideo(id: number) {
    this.router.navigate(['/edu/videos', id])
    this.list = emptyListResponse;
  }

  get listAction(): Observable<ListResponseModel<VideoModel>> {
    return this.activatedRoute.params.pipe(switchMap(params=>{
      return this.videosService.getRelated(+params.id, this.params)
    }))
  }

  get showTitle(): boolean {
    return window.innerWidth > 1000 ? false : true
  }
}
