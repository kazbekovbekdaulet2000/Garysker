import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { VideoModel } from '@core/models/api/video.model';
import { environment } from '@env';
import { ListResponseModel } from '@core/models/api/list.model';
import { Store } from '@ngxs/store';
import { SidebarState } from '@core/states/sidebar/sidebar.state';

interface ReportList {
  videos: VideoModel[]
}

@Injectable({
  providedIn: 'root'
})

export class VideosService extends ApiService {

  constructor(
    protected http: HttpClient,
    private store: Store
  ) {
    super('edu');
  }

  list(params?: any): Observable<ListResponseModel<VideoModel>> {
    const id = this.store.selectSnapshot(SidebarState.selected_category);
    if(id!==null){
      params={category: id}
    } 
    return this.http.get<ListResponseModel<VideoModel>>(this.getUrl('videos'), { params })
      // .pipe(
      //   map(res => {
      //     res.videos.forEach(val => {
      //       if (val.image != null) {
      //         if (val.image.substring(0, 1) === '/') {
      //           val.image = "https://app.garyshker-app.kz" + val.image
      //         }
      //       }
      //     })
      //     return res.videos
      //   })
      // )
  }

}
