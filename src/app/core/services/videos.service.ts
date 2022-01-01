import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { VideoModel } from '@core/models/api/video.model';
import { environment } from '@env';

interface ReportList {
  videos: VideoModel[]
}

@Injectable({
  providedIn: 'root'
})

export class VideosService extends ApiService {

  constructor(
    protected http: HttpClient
  ) {
    super('edu');
  }

  list(params?: any): Observable<VideoModel[]> {
    return this.http.get<ReportList>(this.noSlashUrl('videos'), { params })
      .pipe(
        map(res => {
          res.videos.forEach(val => {
            if (val.image != null) {
              if (val.image.substring(0, 1) === '/') {
                val.image = environment.API + val.image
              }
            }
          })
          return res.videos
        })
      )
  }

}
