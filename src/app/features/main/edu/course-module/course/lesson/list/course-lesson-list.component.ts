import { Component } from '@angular/core';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { CourseService } from '@core/services/courses.service';
import { ModalService } from '@core/services/modal.service';

@Component({
  selector: 'app-course-lesson-list',
  templateUrl: './course-lesson-list.component.html',
  styleUrls: ['./course-lesson-list.component.scss'],
  animations: [opacityAnimation, heightAnimation]
})
export class CourseLessonListComponent {

  constructor(
    public courseService: CourseService,
    private modalService: ModalService
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
          this.modalService.showDialog({
            position: 'center',
            iconType: 'not-found',
            title: '',
            message: 'Урок еще не открыт'
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

