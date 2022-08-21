import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store'
import { emptyListResponse, ListResponseModel } from '@core/models/api/list.model';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { heightAnimation } from '@core/animations/height-animation';
import { UpdateTop } from '@core/states/scroll/scroll';
import { VideoModel } from '@core/models/api/video.model';
import { Component, OnDestroy } from '@angular/core';
import { ListAbstract } from '@core/abstract/list.abstract';
import { VideosService } from '@core/services/videos.service';
import { switchMap } from 'rxjs/operators';
import { CategoriesService } from '@core/services/categories.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
  animations: [opacityAnimation, heightAnimation],
})
export class EduVideosComponent extends ListAbstract<VideoModel> implements OnDestroy {

  constructor(
    private store: Store,
    private router: Router,
    private videosService: VideosService,
    private categoriesService: CategoriesService
  ) {
    super();
    this.page_size = 8;
  }

  get listAction(): Observable<ListResponseModel<VideoModel>> {
    return this.categoriesService.selectedCategory$.pipe(switchMap(category=>{
      let params = this.params
      if(category) {
        params = {...params, category}
      }
      return this.videosService.list(params)
    }))
  }

  onVideoRoute(id: number) {
    this.store.dispatch(new UpdateTop(document.documentElement.scrollTop))
    this.router.navigate(['edu/videos', id])
  }

  ngOnDestroy(): void {
    this.list = emptyListResponse;
    this.category_sub.unsubscribe();
    if(this.list_sub){
      this.list_sub.unsubscribe();
    }
    this.videosService.clear();
  }
}
