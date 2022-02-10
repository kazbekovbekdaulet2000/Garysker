export class ListVideos {
  static readonly type = '[Video] ListVideos';
}

export class ListSavedVideos {
  static readonly type = '[Video] ListSavedVideos';
}

export class GetVideo {
  static readonly type = '[Video] GetVideo';
  constructor(public id: number) { }
}

export class ListVideoComments {
  static readonly type = '[Video] ListVideoComments'
  constructor(public id: number) { }
}

export class ListMoreVideoComments {
  static readonly type = '[Video] ListMoreVideoComments'
  constructor(public id: number) { }
}

export class LikeVideo {
  static readonly type = '[Video] LikeVideo'
  constructor(public id: number) { }
}

export class SaveVideo {
  static readonly type = '[Video] SaveVideo'
  constructor(public id: number) { }
}

export class PostVideoComment {
  static readonly type = '[Video] PostVideoComment'
  constructor(public id: number, public payload: any) { }
}

export class ClearVideoDetail {
  static readonly type = '[Video] ClearReportDetail';
}