import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { emptyListResponse, ListResponseModel } from '@core/models/api/list.model';
import { CommentModel } from '@core/models/api/comment.model';
import { CommentsService } from '@core/services/comments.service';
import iterateComments from 'src/app/features/main/edu/iterateComments';
import getComment from 'src/app/features/main/edu/getComment';
import deleteComment from 'src/app/features/main/edu/deleteComment';
import { ClearComments, DeleteComment, LikeComment, ListComments, PostComment } from './comments.actions';


interface StateModel {
  comments: ListResponseModel<CommentModel>
  comment: CommentModel | null
}

const defaults = {
  comments: emptyListResponse,
  comment: null
};

@State<StateModel>({
  name: 'Comments',
  defaults
})
@Injectable()
export class CommentsState {

  @Selector()
  static comments({ comments }: StateModel): ListResponseModel<CommentModel> {
    return comments;
  }

  constructor(
    private commentsService: CommentsService
  ) {
  }

  @Action(ListComments)
  ListComments({ getState, patchState }: StateContext<StateModel>, { type, id }: ListComments) {
    if (getState().comments.next) {
      const next = getState().comments.next
      const page = next.split('page=')[1]
      if (page) {
        const params = { page }
        this.commentsService.list(type, id, params)
          .subscribe(comments => {
            const list = getState().comments.results
            getState().comments.next = comments.next
            getState().comments.previous = comments.previous
            getState().comments.results = [...list, ...comments.results]
          })
      }
    } else {
      this.commentsService.list(type, id)
        .subscribe(comments => {
          patchState({ comments })
        })
    }
  }

  @Action(PostComment)
  PostComment({ getState }: StateContext<StateModel>, { type, id, payload }: PostComment) {
    this.commentsService.post(type, id!, payload)
      .subscribe(comment => {
        getState().comments.count++
        if (comment.reply) {
          getState().comments.results.map(item => iterateComments(item, comment))
        } else {
          const list = [...[comment], ...getState().comments.results]
          getState().comments.results = list
        }
      })
  }

  @Action(LikeComment)
  LikeReportComment({ getState }: StateContext<StateModel>, { type, id, commentId }: LikeComment) {
    this.commentsService.like(type, id, commentId)
      .subscribe(({ liked }) => {
        const comment = getComment(getState().comments.results, commentId)
        if (!comment) {
          return
        }
        if (liked) {
          comment!.likes_count++
        } else {
          comment!.likes_count--
        }
        comment!.liked = liked
      })
  }

  @Action(DeleteComment)
  DeleteComment({ getState, patchState }: StateContext<StateModel>, {type, id, commentId }: DeleteComment) {
    this.commentsService.delete(type, id, commentId)
      .subscribe(() => {
        patchState({
          comments: {
            ...getState().comments,
            count: getState().comments.count - 1,
            results: deleteComment(getState().comments.results, commentId)
          }
        })
      })
  }

  @Action(ClearComments)
  ClearComments({ patchState, getState }: StateContext<StateModel>) {
    patchState({ comments: emptyListResponse, comment: null })
  }
}
