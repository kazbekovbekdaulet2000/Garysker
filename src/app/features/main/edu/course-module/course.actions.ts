export class ListCourses {
  static readonly type = '[Course] ListCourses';
  constructor(
    public params: any
  ) { }
}

export class GetCourse {
  static readonly type = '[Course] GetCourse';
  constructor(
    public courseId: number
  ) { }
}

export class ListCourseLessons {
  static readonly type = '[Course] ListCourseLessons';
  constructor(
    public courseId: number
  ) { }
}

export class GetCurrentCourseLesson {
  static readonly type = '[Course] GetCurrentCourseLesson';
  constructor(
    public courseId: number
  ) { }
}

export class GetCourseLesson {
  static readonly type = '[Course] GetCourseLesson';
  constructor(
    public courseId: number,
    public lessonId: number
  ) { }
}

export class GetLessonTest{
  static readonly type = '[Course] GetLessonTest';
  constructor(
    public testId: number,
  ) { }
}

export class GetCourseLessonResources {
  static readonly type = '[Course] GetCourseLessonResources';
  constructor(
    public courseId: number,
    public lessonId: number
  ) { }
}

export class ClearCourse {
  static readonly type = '[Course] ClearCourse';
}

export class ClearLesson {
  static readonly type = '[Course] ClearLesson';
}

export class ClearCourseList {
  static readonly type = '[Course] ClearCourseList';
}


