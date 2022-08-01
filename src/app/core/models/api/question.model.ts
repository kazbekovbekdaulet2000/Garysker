export interface AnswerModel {
  id: number
  answer_kk: string
  answer_ru: string
}

export interface QuestionModel {
  id: number
  question_kk: string
  question_ru: string
  point: number
  answer: boolean
}

export interface QuestionDetailModel {
  id: number
  question_kk: string
  question_ru: string
  point: number
  answers: AnswerModel[]
}

export interface QuizAttemptModel {
  attempt: number
  completed: boolean
  end_time: string
  id: number
  lesson_progress: number
  progress: number
  quiz: number
  start_time: string
  user: number
}