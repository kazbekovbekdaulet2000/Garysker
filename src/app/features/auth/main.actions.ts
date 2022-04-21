export class ListQuestions {
  static readonly type = '[Main] ListQuestions'
}

export class ClearPopular{
  static readonly type = '[Main] ClearPopular'
}

export class ChangeCategory {
  static readonly type = '[Main] ChangeCategory';
  constructor(
    public id: number
  ){}
}
