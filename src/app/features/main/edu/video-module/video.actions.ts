export class ListVideos {
  static readonly type = '[Video] ListVideos';
  constructor(
    public params: any
  ) { }
}

export class ListMoreVideos {
  static readonly type = '[Video] ListMoreVideos';
  constructor(
    public params: any
  ) { }
}

export class ListRelatedVideos {
  static readonly type = '[Video] ListRelatedVideos';
  constructor(
    public id: number,
    public params: any
  ) { }
}

export class ListSavedVideos {
  static readonly type = '[Video] ListSavedVideos';
}

export class ListMoreSavedVideos {
  static readonly type = '[Video] ListMoreSavedVideos';
}

export class GetVideo {
  static readonly type = '[Video] GetVideo';
  constructor(public id: number) { }
}

export class ListVideoComments {
  static readonly type = '[Video] ListVideoComments'
  constructor(public id: number) { }
}

export class LikeVideoComment {
  static readonly type = '[Video] LikeVideoComment'
  constructor(
    public reportId: number,
    public commentId: number
  ) { }
}

export class ListMoreVideoComments {
  static readonly type = '[Video] ListMoreVideoComments'
  constructor(public id: number) { }
}

export class ClearVideoComments {
  static readonly type = '[Video] ClearVideoComments'
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

export class ClearVideoList {
  static readonly type = '[Video] ClearVideoList';
}

export class ClearRelatedVideoList{
  static readonly type = '[Video] ClearRelatedVideoList';
}