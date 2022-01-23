export class ListReports {
  static readonly type = '[Main] ListReports';
}

export class GetReport {
  static readonly type = '[Main] GetReport';
  constructor(public id: number) { }
}

export class ListReportComments {
  static readonly type = '[Main] ListComments'
  constructor(public id: number) { }
}

export class LikeReport {
  static readonly type = '[Main] LikeReport'
  constructor(public id: number) { }
}

export class SaveReport {
  static readonly type = '[Main] SaveReport'
  constructor(public id: number) { }
}

export class PostReportComment {
  static readonly type = '[Main] PostReportComment'
  constructor(public id: number, public payload: any) { }
}

export class ClearReportDetail {
  static readonly type = '[Main] ClearReportDetail';
}

export class ListVideos {
  static readonly type = '[Main] ListVideos';
}

export class ListDobroProjects {
  static readonly type = '[Main] ListDobroProjects';
}

export class GetDobroProject {
  static readonly type = '[Main] GetDobroProject'
  constructor(public id: number) { }
}

export class ClearDobroDetails {
  static readonly type = '[Main] ClearDobroDetails'
}

export class ListQuestions {
  static readonly type = '[Main] ListQuestions'
}
