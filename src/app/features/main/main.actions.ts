export class ListReports {
  static readonly type = '[Main] ListReports';
}

export class ListVideos {
  static readonly type = '[Main] ListVideos';
}

export class ListDobroProjects {
  static readonly type = '[Main] ListDobroProjects';
}

export class GetDobroProject{
  static readonly type = '[Main] GetDobroProject'
  constructor(public id: number){}
}

export class ClearDobroDetails{
  static readonly type = '[Main] ClearDobroDetails'
}