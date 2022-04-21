export class ListQuestions {
  static readonly type = '[Main] ListQuestions'
}

export class ChangeCategory {
  static readonly type = '[Main] ChangeCategory';
  constructor(
    public id: number
  ) { }
}