import { Router } from '@angular/router';
import { Observable, } from 'rxjs';
import { Select, Store } from '@ngxs/store'
import { ListResponseModel } from '@core/models/api/list.model';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { heightAnimation } from '@core/animations/height-animation';
import { UpdateTop } from '@core/states/scroll/scroll';
import { MainState } from '../../../main.state';
import { VideoState } from '../../video-module/video.state';
import { VideoModel } from '@core/models/api/video.model';
import { ListMoreVideos } from '../../video-module/video.actions';
import { Component } from '@angular/core';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
  animations: [opacityAnimation, heightAnimation],
})
export class EduVideosComponent {
  
  @Select(VideoState.videos) videos$!: Observable<ListResponseModel<VideoModel>>;

  constructor(
    private store: Store,
    private router: Router
  ) { }

  loadVideo(next: string) {
    const categoryId = this.store.selectSnapshot(MainState.selectedCategory)
    const pageNumber = Number(next.split('page=')[1])
    let params = { page: pageNumber }
    if (categoryId) {
      params = { ...params, ...{ category: categoryId } }
    }
    this.store.dispatch(new ListMoreVideos(params))
  }

  onVideoRoute(id: number) {
    this.store.dispatch(new UpdateTop(document.documentElement.scrollTop))
    this.router.navigate(['edu/videos', id])
  }
}
