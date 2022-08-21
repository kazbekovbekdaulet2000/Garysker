import { Injectable } from '@angular/core';
import { emptyListResponse, ListResponseModel } from '@core/models/api/list.model';
import { VideoDetailModel, VideoModel } from '@core/models/api/video.model';
import { VideosService } from '@core/services/videos.service';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import {
  ListVideos,
  GetVideo,
  LikeVideo,
  SaveVideo,
  ClearVideoDetail,
  ListSavedVideos,
  ListMoreVideos,
  ListRelatedVideos,
  ClearVideoList,
  ListMoreSavedVideos,
  ClearRelatedVideoList,
  IncreaseVideoComments,
  DecreaseVideoComments,
} from './video.actions';

interface StateModel {
  videos: ListResponseModel<VideoModel>;
  related_videos: ListResponseModel<VideoModel>;
  video: VideoDetailModel | null;
}

const defaults = {
  videos: emptyListResponse,
  related_videos: emptyListResponse,
  video: null,
};

@State<StateModel>({
  name: 'Video',
  defaults
})
@Injectable()
export class VideoState {
  constructor(
    private store: Store,
    private videoService: VideosService,
  ) { }
}
