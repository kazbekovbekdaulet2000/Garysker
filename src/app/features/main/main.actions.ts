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

export class UpdatePopular {
  static readonly type = '[Main] UpdatePopular'
  constructor(public payload: any, public type: string) { }
}

export class ClearPopular{
  static readonly type = '[Main] ClearPopular'
}