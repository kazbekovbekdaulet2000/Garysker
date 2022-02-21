export class ListComments {
  static readonly type = '[Comments] ListComments';
  constructor(
    public id: number,
    public page: number,
    public type: string
  ) { }
}

export class PostComment {
  static readonly type = '[Comments] PostComment';
  constructor(
    public id: number,
    public payload: any,
    public type: string
  ) { }
}

export class LikeComment {
  static readonly type = '[Comments] LikeComment';
  constructor(
    public id: number,
    public commentId: number,
    public type: string
  ) { }
}

export class ClearComments {
  static readonly type = '[Comments] ClearComments';
}