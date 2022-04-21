export class ListReports {
  static readonly type = '[Report] ListReports';
  constructor(
    public params: any
  ){}
}

export class ListMoreReports {
  static readonly type = '[Report] ListMoreReports';
}

export class ListSavedReports {
  static readonly type = '[Report] ListSavedReports';
}

export class ListMoreSavedReports {
  static readonly type = '[Report] ListMoreSavedReports';
}

export class GetReport {
  static readonly type = '[Report] GetReport';
  constructor(public id: number) { }
}

export class GetRelatedReports {
  static readonly type = '[Report] GetRelatedReports';
  constructor(
    public id: number,
    public params: any
  ){}
}

export class LikeReport {
  static readonly type = '[Report] LikeReport'
  constructor(public id: number) { }
}

export class SaveReport {
  static readonly type = '[Report] SaveReport'
  constructor(public id: number) { }
}

export class IncreaseReportComments {
  static readonly type = '[Report] IncreaseReportComments'
}

export class DecreaseReportComments {
  static readonly type = '[Report] DecreaseReportComments'
}

export class ClearReportDetail {
  static readonly type = '[Report] ClearReportDetail';
}

export class ClearRelatedReportList {
  static readonly type = '[Report] ClearRelatedReportList';
}

export class ClearReportList{
  static readonly type = '[Report] ClearReportList';
}