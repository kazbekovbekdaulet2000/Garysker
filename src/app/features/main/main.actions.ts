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

export class ChangeCategory {
  static readonly type = '[Main] ChangeCategory';
  constructor(
    public id: number
  ) { }
}