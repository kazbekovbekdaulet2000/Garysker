import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { CourseService } from '@core/services/courses.service';
import { ModalService } from '@core/services/modal.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './course-lesson-quiz.component.html',
  styleUrls: ['./course-lesson-quiz.component.scss'],
  animations: [opacityAnimation, heightAnimation]
})
export class CourseLessonQuizComponent {

  selected_answer: number = NaN;

  constructor(
    public courseService: CourseService,
    public bsModalService: BsModalService,
    public modalService: ModalService,
    public router: Router
  ) {
    this.courseService.getCurrentQuiz(this.courseId, this.lessonId).subscribe({
      next: attempt => {
        this.getQuestions()
      },
      error: err => {
        if (err.status === 404) {
          this.courseService.startQuiz(this.courseId, this.lessonId).subscribe(attempt => {
            this.getQuestions()
          },
            err => {
              if (err.status === 400) {
                this.modalService.showConfirmDialog({
                  position: 'center',
                  title: 'Мы видим, что вы стараетесь!',
                  message: 'Количество попыток закончилась',
                  iconType: 'hope',
                  confirmText: 'Перейти далее',
                  onConfirm: () => {
                    this.getCurrentLesson()
                    this.courseService.listLessons(this.courseId).subscribe(()=>{})
                  }
                })
                this.router.navigate(['edu/courses', this.courseId])
              }
            })
        }
      }
    })
  }

  getQuestions() {
    this.courseService.listQuestions(this.courseId, this.lessonId).subscribe((questions) => {
      const question = questions.find(obj => obj.answer === false) || questions[0]
      this.onQuestion(question.id)
    })
  }

  getCurrentLesson() {
    this.courseService.getCurrentLesson(this.courseId).subscribe((lesson) => {
      if (lesson.quiz) {
        this.courseService.getQuiz(this.courseId, lesson.id).subscribe({
          next: () => { },
          error: () => {
            this.courseService.quiz = null
          }
        })
        this.router.navigate(['edu/courses', this.courseId])
      }
    })
  }

  onQuestion(id: number) {
    this.courseService.getQuestion(this.courseId, this.lessonId, id).subscribe(() => {
      this.courseService.getQuestionAnswers(this.courseId, this.lessonId, id).subscribe((answer) => {
        this.selected_answer = NaN
        for (let i = 0; i < answer.length; ++i) {
          if (answer[i].quiz_progress === this.courseService.attempt.id) {
            this.selected_answer = answer[i].answer
          }
        }
      })
    })
  }

  onAnswer(id: number) {
    this.selected_answer = id
    const payload = {
      answer: this.selected_answer
    }
    this.courseService.answerQuestion(this.courseId, this.lessonId, this.courseService.question.id, payload).subscribe(answer => {
      for (let i = 0; i < this.courseService.questions.length; ++i) {
        if (this.courseService.question.id === this.courseService.questions[i].id) {
          this.courseService.questions[i].answer = true
        }
      }
    })
  }

  onNext() {
    const questions = this.courseService.questions
    for (let i = 0; i < questions.length - 1; ++i) {
      if (questions[i].id === this.courseService.question.id) {
        this.onQuestion(questions[i + 1].id)
      }
    }
  }

  onFinish() {
    this.courseService.finishQuiz(this.courseId, this.lessonId).subscribe(attempt => {
      this.courseService.quiz = null
      this.courseService.questions = []
      this.courseService.question = null

      this.modalService.showDialog({
        position: 'center',
        title: "",
        message: attempt.completed
          ? `Поздравляю вы набрали ${attempt.progress}%`
          : `Вы набрали недостаточно баллов для прохаждения далее, ваш балл ${attempt.progress}`,
        iconType: attempt.completed ? 'congrats' : 'success',
        onConfirm: ()=>{
          this.getCurrentLesson()
          this.courseService.get(this.courseId).subscribe(()=>{})
          this.courseService.listLessons(this.courseId).subscribe(() => { })
          this.router.navigate(['edu/courses', this.courseId])
        }
      })
    })
  }

  get courseId(): number {
    return this.courseService.course.id
  }

  get lessonId(): number {
    return this.courseService.lesson.id
  }

  get lastQuestion(): number {
    return this.courseService.questions[this.courseService.questions.length - 1].id
  }
}

