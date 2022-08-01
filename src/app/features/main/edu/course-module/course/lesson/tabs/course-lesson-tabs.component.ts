import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { LessonDetailModel } from '@core/models/api/lesson.model';
import { QuizModel } from '@core/models/api/quiz.model';
import { CourseService } from '@core/services/courses.service';

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
    private router: Router
  ) { }

  startQuiz(quiz: QuizModel) {
    if (quiz) {
      this.router.navigate([this.router.url, 'quiz'])
    }
  }

  nextLesson(lesson: LessonDetailModel) {
    if (lesson.current) {
      this.courseService.nextLesson(this.courseService.course.id).subscribe((ans: any) => {
        if(ans.message === 'course completed'){
          this.router.navigate(['edu'])
          alert('courseCompleted')
        }
        this.courseService.init(this.courseService.course.id)
      })
    } 
  }
}

