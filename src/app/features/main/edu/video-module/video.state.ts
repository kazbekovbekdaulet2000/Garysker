import { Injectable } from '@angular/core';
import { CommentModel } from '@core/models/api/comment.model';
import { emptyListResponse, ListResponseModel } from '@core/models/api/list.model';
import { ReportDetailModel, ReportModel } from '@core/models/api/report.model';
import { VideoDetailModel, VideoModel } from '@core/models/api/video.model';
import { ReportsService } from '@core/services/reports.service';
import { VideosService } from '@core/services/videos.service';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { MainState } from '../../main.state';
import deleteComment from '../deleteComment';
import getComment from '../getComment';
import iterateComments from '../iterateComments';
import {
  ListVideos,
  GetVideo,
  ListVideoComments,
  LikeVideo,
  SaveVideo,
  PostVideoComment,
  ClearVideoDetail,
  ListMoreVideoComments,
  ListSavedVideos,
  ListMoreVideos,
  LikeVideoComment,
  ListRelatedVideos,
  ClearVideoList,
  ListMoreSavedVideos,
  ClearVideoComments,
  ClearRelatedVideoList,
  DeleteVideoComment
} from './video.actions';

interface StateModel {
  videos: ListResponseModel<VideoModel>;
  related_videos: ListResponseModel<VideoModel>;
  video: VideoDetailModel | null;
  comments: ListResponseModel<CommentModel>;
}

const defaults = {
  videos: emptyListResponse,
  related_videos: emptyListResponse,
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
  static related_videos({ related_videos }: StateModel): ListResponseModel<VideoModel> {
    return related_videos;
  }

  @Selector()
  static comments({ comments }: StateModel): ListResponseModel<CommentModel> {
    if (comments.count === 0) {
      comments.results = []
    }
    return comments;
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
  ListVideoComments({ patchState, getState }: StateContext<StateModel>, { id }: ListVideoComments) {
    this.videoService.listComments(id)
      .toPromise()
      .then(comments => {
        patchState({ comments: comments })
      })
  }

  @Action(ClearVideoComments)
  ClearVideoComments({ patchState, getState }: StateContext<StateModel>) {
    getState().comments.results = []
    patchState({ comments: emptyListResponse })
  }

  @Action(ListMoreVideoComments)
  ListMoreVideoComments({ getState, patchState }: StateContext<StateModel>, { id }: ListMoreVideoComments) {
    const next = getState().comments.next
    if (next) {
      const page = Number(next.split('page=')[1])
      const params = { page }
      this.videoService.listComments(id, params)
        .subscribe(comments => {
          const list = getState().comments.results
          const new_list = getState().comments
          new_list.next = comments.next
          new_list.previous = comments.previous
          new_list.results = [...list, ...comments.results]
          patchState({ comments: new_list })
        })
    }
  }

  @Action(PostVideoComment)
  PostVideoComment({ getState, patchState }: StateContext<StateModel>, { id, payload }: PostVideoComment) {
    this.videoService.postComment(id, payload)
      .subscribe(comment => {
        getState().video!.comments_count += 1
        getState().comments.count += 1
        if (comment.reply) {
          getState().comments.results.map(item => iterateComments(item, comment))
        } else {
          let list = [...[comment], ...getState().comments.results]
          getState().comments.results = list
        }
      })
  }

  @Action(LikeVideoComment)
  LikeVideoComment({ getState, patchState }: StateContext<StateModel>, { reportId, commentId }: LikeVideoComment) {
    this.videoService.likeComment(reportId, commentId)
      .subscribe(({ liked }) => {
        const comment = getComment(getState().comments.results, commentId)
        if (!comment) {
          return
        }
        if (liked) {
          comment!.likes_count += 1
        } else {
          comment!.likes_count -= 1
        }
        comment!.liked = liked
      })
  }

  @Action(DeleteVideoComment)
  DeleteVideoComment({ getState, patchState }: StateContext<StateModel>, { reportId, commentId }: DeleteVideoComment) {
    this.videoService.deleteComment(reportId, commentId)
      .toPromise().then(() => {
        getState().video!.comments_count -= 1
        patchState({
          comments: {
            ...getState().comments,
            results: deleteComment(getState().comments.results, commentId)
          }
        })
        // this.store.dispatch(new ListVideoComments(reportId))
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
