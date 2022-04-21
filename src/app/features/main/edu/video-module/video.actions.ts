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

export class IncreaseVideoComments {
  static readonly type = '[Video] IncreaseVideoComments'
}

export class DecreaseVideoComments {
  static readonly type = '[Video] DecreaseVideoComments'
}

export class GetVideo {
  static readonly type = '[Video] GetVideo';
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

export class ClearVideoDetail {
  static readonly type = '[Video] ClearReportDetail';
}

export class ClearVideoList {
  static readonly type = '[Video] ClearVideoList';
}

export class ClearRelatedVideoList {
  static readonly type = '[Video] ClearRelatedVideoList';
}