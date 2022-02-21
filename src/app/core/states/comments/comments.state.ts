import { Injectable } from '@angular/core';
import { Action, Actions, Selector, State, StateContext } from '@ngxs/store';

import { emptyListResponse, ListResponseModel } from '@core/models/api/list.model';
import { CommentModel } from '@core/models/api/comment.model';
import { CommentService } from '@core/services/comments.service';
import { ClearComments, LikeComment, ListComments, PostComment } from './comments.actions';
import iterateComments from 'src/app/features/main/edu/iterateComments';
import getComment from 'src/app/features/main/edu/getComment';


interface StateModel {
  comments: ListResponseModel<CommentModel>
}

const defaults = {
  comments: emptyListResponse,
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
    private commentService: CommentService
  ) {
  }

  @Action(ListComments)
  ListComments({ patchState }: StateContext<StateModel>, { id, page, type }: ListComments) {
    this.commentService.listComments(id, type)
      .subscribe(comments => {
        console.log(comments)
        patchState({ comments });
      })
  }

  @Action(PostComment)
  PostComment({ getState, patchState }: StateContext<StateModel>, { id, payload, type }: PostComment) {
    this.commentService.postComment(id, payload, type)
      .subscribe(comment => {
        if (comment.reply) {
          getState().comments.results.map(item => iterateComments(item, comment))
        } else {
          const list = [...[comment], ...getState().comments.results]
          getState().comments.results = list
        }
      })
  }

  @Action(LikeComment)
  LikeComment({ getState, patchState }: StateContext<StateModel>, { id, commentId, type }: LikeComment) {
    this.commentService.likeComment(id, commentId, type)
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

  @Action(ClearComments)
  ClearComments({ getState, patchState }: StateContext<StateModel>) {
    patchState({ comments: emptyListResponse })
  }
}
