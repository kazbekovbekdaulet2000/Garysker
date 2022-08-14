import { Component } from '@angular/core';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { LessonModel } from '@core/models/api/lesson.model';
import { CourseService } from '@core/services/courses.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MessageModalComponent } from 'src/app/shared/modals/err-modal/err-modal.component';

@Component({
  selector: 'app-course-lesson-list',
  templateUrl: './course-lesson-list.component.html',
  styleUrls: ['./course-lesson-list.component.scss'],
  animations: [opacityAnimation, heightAnimation]
})
export class CourseLessonListComponent {

  constructor(
    public courseService: CourseService,
    public bsModalService: BsModalService
  ) { }

  changeLesson(lessonId: number) {
    this.courseService.getLesson(this.courseService.course.id, lessonId).subscribe(lesson => {
      this.courseService.lesson = lesson
      this.courseService.getResources(this.courseService.course.id, lesson.id).subscribe(()=>{})
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
    },
      (error) => {
        if (error.status === 403) {
          this.bsModalService.show(MessageModalComponent, {
            initialState: { message: 'Урок еще не открыт', icon: 'sticker1' }, //TODO
            class: 'modal-dialog-centered'
          })
        }
      })
  }

  get lessonIndex(): number {
    return this.courseService.lessons.findIndex(obj => {
      return obj.id === this.courseService.lesson.id;
    });
  }

  get completedCount(): number {
    return this.courseService.lessons.map(obj=>obj.finished).reduce((prev, curr)=>{
      if(curr===true){
        return prev+1
      }
      return prev
    }, 0)
  }
}

