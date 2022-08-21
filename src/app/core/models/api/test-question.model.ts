export interface TestQuestionDetailModel {
  id: number
  index: number | null
  title: string
  point: number
  user_answer: number
  answers: TestQuestionAnswer[]
}

export interface TestQuestionAnswer {
  id: number
  answer_text: string
}