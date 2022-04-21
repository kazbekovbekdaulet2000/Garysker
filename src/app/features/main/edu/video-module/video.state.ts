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

  @Selector()
  static videos({ videos }: StateModel): ListResponseModel<VideoModel> {
    return videos;
  }

  @Selector()
  static video({ video }: StateModel): VideoDetailModel | null {
    return video;
  }

  @Selector()
  static related_videos({ related_videos }: StateModel): ListResponseModel<VideoModel> {
    return related_videos;
  }

  constructor(
    private store: Store,
    private videoService: VideosService,
  ) { }

  @Action(ListVideos)
  ListVideos({ getState, patchState }: StateContext<StateModel>, { params }: ListVideos) {
    if (getState().videos.results.length === 0) {
      this.videoService.list(params)
        .subscribe(videos => {
          patchState({ videos });
        })
    }
  }

  @Action(ListMoreVideos)
  ListMoreVideos({ getState, patchState }: StateContext<StateModel>, { params }: ListMoreVideos) {
    this.videoService.list(params)
      .subscribe(videos => {
        const { count, results, next, previous } = videos
        const newVideo = getState().videos
        newVideo.count = count
        newVideo.next = next
        newVideo.results = [...newVideo.results, ...results]
        newVideo.previous = previous
        patchState({ videos: newVideo })
      })
  }

  @Action(ListMoreSavedVideos)
  ListMoreSavedVideos({ getState, patchState }: StateContext<StateModel>) {
    if (getState().videos.next) {
      const pageNumber = Number(getState().videos.next.split('page=')[1])
      const params = { page: pageNumber }
      this.videoService.listSaved(params)
        .subscribe(reports => {
          const { count, results, next, previous } = reports
          const newVideos = getState().videos
          newVideos.count = count
          newVideos.next = next
          newVideos.results = [...newVideos.results, ...results]
          newVideos.previous = previous
          patchState({ videos: newVideos })
        })
    }
  }

  @Action(ListSavedVideos)
  ListSavedVideos({ getState, patchState }: StateContext<StateModel>) {
    this.videoService.listSaved()
      .subscribe(videos => {
        patchState({ videos });
      })
  }

  @Action(GetVideo)
  GetVideo({ patchState }: StateContext<StateModel>, { id }: GetVideo) {
    this.videoService.get(id)
      .subscribe(video => {
        patchState({ video });
      })
  }

  @Action(ListRelatedVideos)
  ListRelatedVideos({ patchState, getState }: StateContext<StateModel>, { id, params }: ListRelatedVideos) {
    this.videoService.getRelated(id, params)
      .subscribe(related_videos => {
        const list = getState().related_videos.results
        const new_list = related_videos
        new_list.count = related_videos.count
        new_list.next = related_videos.next
        new_list.previous = related_videos.previous
        if (params.page !== 1) {
          new_list.results = [...list, ...related_videos.results]
        } else {
          new_list.results = related_videos.results
        }
        patchState({ related_videos: new_list })
      })
  }

  @Action(IncreaseVideoComments)
  IncreaseVideoComments({getState}: StateContext<StateModel>){
    getState().video!.comments_count++
  }

  @Action(DecreaseVideoComments)
  DecreaseVideoComments({getState}: StateContext<StateModel>){
    getState().video!.comments_count--
  }

  @Action(LikeVideo)
  LikeVideo({ getState, patchState }: StateContext<StateModel>, { id }: LikeVideo) {
    this.videoService.like(id)
      .subscribe(ans => {
        let newVideo = getState().video
        newVideo!.liked = ans?.liked
        if (newVideo!.liked) {
          newVideo!.likes_count += 1
        } else {
          newVideo!.likes_count -= 1
        }
        patchState({ video: newVideo })
      })
  }

  @Action(SaveVideo)
  SaveVideo({ getState, patchState }: StateContext<StateModel>, { id }: SaveVideo) {
    this.videoService.save(id)
      .subscribe(ans => {
        let newVideo = getState().video
        newVideo!.bookmarked = ans?.bookmarked
        if (newVideo!.bookmarked) {
          newVideo!.bookmarks_count += 1
        } else {
          newVideo!.bookmarks_count -= 1
        }
        patchState({ video: newVideo })
      })
  }

  @Action(ClearVideoDetail)
  ClearReportDetail({ patchState }: StateContext<StateModel>) {
    patchState({ video: null });
  }

  @Action(ClearVideoList)
  ClearVideoList({ patchState, getState }: StateContext<StateModel>) {
    getState().videos.results = []
    patchState({ videos: emptyListResponse });
  }

  @Action(ClearRelatedVideoList)
  ClearRelatedVideoList({ patchState, getState }: StateContext<StateModel>) {
    getState().related_videos.results = []
    patchState({ related_videos: emptyListResponse });
  }
}
