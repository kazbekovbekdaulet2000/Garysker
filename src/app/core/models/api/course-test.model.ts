export interface TestModel {
  id: number
  lesson: string
  questions: TestQuestionModel[]
  created_at: string
  updated_at: string
  finished: boolean
  lesson_module: number
}


export interface TestQuestionModel {
  id: number
  answered: boolean
}

