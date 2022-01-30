import { Injectable } from '@angular/core';
import { CommentModel } from '@core/models/api/comment.model';
import { emptyListResponse, ListResponseModel } from '@core/models/api/list.model';
import { ReportDetailModel, ReportModel } from '@core/models/api/report.model';
import { VideoDetailModel, VideoModel } from '@core/models/api/video.model';
import { ReportsService } from '@core/services/reports.service';
import { VideosService } from '@core/services/videos.service';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import iterateComments from '../report-module/report.state';
import {
  ListVideos,
  GetVideo,
  ListVideoComments,
  LikeVideo,
  SaveVideo,
  PostVideoComment,
  ClearVideoDetail,
  ListMoreVideoComments
} from './video.actions';

interface StateModel {
  videos: ListResponseModel<VideoModel>;
  video: VideoDetailModel | null;
  comments: ListResponseModel<CommentModel>;
}

const defaults = {
  videos: emptyListResponse,
  video: null,
  comments: emptyListResponse,
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
  static comments({ comments }: StateModel): ListResponseModel<CommentModel> {
    return comments;
  }

  constructor(
    private store: Store,
    private videoService: VideosService,
  ) { }

  @Action(ListVideos)
  ListVideos({ getState, patchState }: StateContext<StateModel>) {
    this.videoService.list()
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

  @Action(ListVideoComments)
  ListVideoComments({ patchState }: StateContext<StateModel>, { id }: ListVideoComments) {
    this.videoService.listComments(id)
      .subscribe(comments => {
        patchState({ comments })
      })
  }

  @Action(ListMoreVideoComments)
  ListMoreVideoComments({ getState, patchState }: StateContext<StateModel>, { id }: ListMoreVideoComments) {
    const next = getState().comments.next
    const page = next.split('page=')[1]
    if (page) {
      const params = { page }
      this.videoService.listComments(id, params)
        .subscribe(comments => {
          const list = getState().comments.results
          getState().comments.next = comments.next
          getState().comments.previous = comments.previous
          getState().comments.results = [...list, ...comments.results]
        })
    }
  }

  @Action(PostVideoComment)
  PostVideoComment({ getState, patchState }: StateContext<StateModel>, { id, payload }: PostVideoComment) {
    this.videoService.postComment(id, payload)
      .subscribe(comment => {
        getState().comments.count += 1
        if (comment.reply) {
          getState().comments.results.map(item => iterateComments(item, comment))
        } else {
          let list = [...[comment], ...getState().comments.results]
          getState().comments.results = list
        }
      })
  }

  @Action(ClearVideoDetail)
  ClearReportDetail({ patchState }: StateContext<StateModel>) {
    patchState({ video: null });
  }
}
