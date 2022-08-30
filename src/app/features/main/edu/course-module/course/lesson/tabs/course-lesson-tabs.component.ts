import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { LessonDetailModel } from '@core/models/api/lesson.model';
import { QuizModel } from '@core/models/api/quiz.model';
import { CourseService } from '@core/services/courses.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CourseRatingModalModalComponent } from '../../rating-modal/course-rating-modal.component';

@Component({
  selector: 'app-course-lesson-tabs',
  templateUrl: './course-lesson-tabs.component.html',
  styleUrls: ['./course-lesson-tabs.component.scss'],
  animations: [opacityAnimation, heightAnimation]
})
export class CourseLessonTabsComponent {
  tab: 'desc' | 'resources' = 'desc'

  constructor(
    public courseService: CourseService,
    private router: Router,
    private bsModalService: BsModalService
  ) { }

  startQuiz(quiz: QuizModel) {
    if (quiz) {
      this.router.navigate([this.router.url, 'quiz'])
    }
  }

  nextLesson(lesson: LessonDetailModel) {
    if (lesson.current) {
      this.courseService.nextLesson(this.courseService.course.id).subscribe((ans: any) => {
        if (ans.message === 'course completed') {
          this.bsModalService.show(CourseRatingModalModalComponent, {
            class: 'modal-dialog-centered',
            ignoreBackdropClick: true,
            initialState: {
              courseId: this.courseService.course.id
            }
          })
        }
        this.courseService.init(this.courseService.course.id)
      })
    }
  }

  get isLastLesson(): boolean {
    const last_lesson = this.courseService.lessons[this.courseService.lessons.length - 1]
    if (this.courseService.lesson) {
      return last_lesson.id === this.courseService.lesson.id
    }
    return false
  }

  getNextLesson() {
    const lessons = this.courseService.lessons
    for (let i = 0; i < lessons.length - 1; ++i) {
      if (lessons[i].id === this.courseService.lesson.id) {
        this.courseService.getLesson(this.courseService.course.id, lessons[i + 1].id).subscribe(lesson => {
          this.courseService.lesson = lesson
          this.courseService.getResources(this.courseService.course.id, lesson.id).subscribe(() => { })
          if (this.courseService.lesson.quiz) {
            this.courseService.getQuiz(this.courseService.course.id, lesson.id).subscribe({
              next: quiz => {
                this.courseService.quiz = quiz
              },
              error: () => {
                this.courseService.quiz = null
                this.courseService.navigateMain()
              },
              complete: () => {
                this.courseService.inited = true
              }
            })
          } else {
            this.courseService.quiz = null
          }
        })
      }
    }
  }
}

