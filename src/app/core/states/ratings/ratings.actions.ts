export class ListRatings {
  static readonly type = '[Ratings] ListRatings';
  constructor(
    public id: number,
  ) { }
}

export class PostRating {
  static readonly type = '[Ratings] PostRating';
  constructor(
    public id: number,
    public payload: any
  ) { }
}

export class LikeRating {
  static readonly type = '[Ratings] LikeRating';
  constructor(
    public id: number,
    public ratingId: number
  ) { }
}

export class DeleteRating {
  static readonly type = '[Ratings] DeleteRating'
  constructor(
    public id: number,
    public ratingId: number
  ) { }
}

export class ClearRatings {
  static readonly type = '[Ratings] ClearRatings';
}