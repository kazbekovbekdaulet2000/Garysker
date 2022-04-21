export class GetLessonTest {
  static readonly type = '[LessonTest] GetLessonTest';
  constructor(
    public testId: number
  ) { }
}

export class GetLessonTestResult {
  static readonly type = '[LessonTest] GetLessonTestResult';
  constructor(
    public testId: number
  ) { }
}

export class FinishLessonTest { 
  static readonly type = '[LessonTest] FinishLessonTest';
  constructor(
    public testId: number
  ) { }
}

export class ResetLessonTest { 
  static readonly type = '[LessonTest] ResetLessonTest';
  constructor(
    public testId: number
  ) { }
}

export class GetLessonTestQuestions {
  static readonly type = '[LessonTest] GetLessonTestQuestions';
  constructor(
    public testId: number
  ) { }
}

export class PostLessonTestQuestionAnwer{ 
  static readonly type = '[LessonTest] PostLessonTestQuestionAnwer';
  constructor(
    public testId: number,
    public questionId: number,
    public payload: any
  ) { }
}

export class ClearLessonTest {
  static readonly type = '[LessonTest] ClearLessonTest';
}
