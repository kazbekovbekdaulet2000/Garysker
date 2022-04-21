import { CommentType } from "@core/services/comments.service";

export class ListComments {
  static readonly type = '[Comments] ListComments';
  constructor(
    public type: CommentType,
    public id: number,
  ) { }
}

export class PostComment {
  static readonly type = '[Comments] PostComment';
  constructor(
    public type: CommentType,
    public id: number,
    public payload: any
  ) { }
}

export class LikeComment {
  static readonly type = '[Comments] LikeComment';
  constructor(
    public type: CommentType,
    public id: number,
    public commentId: number
  ) { }
}

export class DeleteComment {
  static readonly type = '[Comments] DeleteComment'
  constructor(
    public type: CommentType,
    public id: number,
    public commentId: number
  ) { }
}

export class ClearComments {
  static readonly type = '[Comments] ClearComments';
}