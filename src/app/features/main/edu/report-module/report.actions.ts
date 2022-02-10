export class ListReports {
  static readonly type = '[Report] ListReports';
}

export class ListSavedReports {
  static readonly type = '[Report] ListSavedReports';
}

export class GetReport {
  static readonly type = '[Report] GetReport';
  constructor(public id: number) { }
}

export class ListReportComments {
  static readonly type = '[Report] ListComments'
  constructor(public id: number) { }
}

export class ListMoreReportComments {
  static readonly type = '[Report] ListMoreReportComments'
  constructor(public id: number) { }
}

export class LikeReport {
  static readonly type = '[Report] LikeReport'
  constructor(public id: number) { }
}

export class SaveReport {
  static readonly type = '[Report] SaveReport'
  constructor(public id: number) { }
}

export class PostReportComment {
  static readonly type = '[Report] PostReportComment'
  constructor(public id: number | undefined, public payload: any) { }
}

export class ClearReportDetail {
  static readonly type = '[Report] ClearReportDetail';
}