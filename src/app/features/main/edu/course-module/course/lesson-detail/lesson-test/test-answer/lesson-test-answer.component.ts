import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { TestModel } from '@core/models/api/course-test.model';
import { TestQuestionDetailModel } from '@core/models/api/test-question.model';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PostLessonTestQuestionAnwer } from '../lesson-test.actions';
import { LessonTest } from '../lesson-test.state';

@Component({
  selector: "app-lesson-test-question",
  templateUrl: './lesson-test-answer.component.html',
  styleUrls: ['./lesson-test-answer.component.scss'],
  animations: [opacityAnimation, heightAnimation]
})
export class CourseLessonTestQuestionComponent implements OnChanges {
  @Input() question: TestQuestionDetailModel
  @Input() testId: number

  @Select(LessonTest.test) test$!: Observable<TestModel>
  @Select(LessonTest.questions) questions$!: Observable<TestQuestionDetailModel[]>;

  formData = this.formBuilder.group({
    selected_answer: [null, Validators.required]
  })

  @Output() nextQuestion = new EventEmitter;
  @Output() finishTest = new EventEmitter;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.formData.patchValue({
      selected_answer: changes.question.currentValue.user_answer
    })
  }

  answerQuestion() {
    this.store.dispatch(new PostLessonTestQuestionAnwer(this.testId, this.question.id, this.formData.getRawValue()))
  }

  get answered(): number | null | undefined {
    return this.formData.get('selected_answer')!.value
  }

  changeAnswer(id: number) {
    this.formData.patchValue({
      selected_answer: id
    })
    this.question.user_answer = id
    this.answerQuestion()
  }

  next() {
    this.nextQuestion.emit()
  }

  finish() {
    this.finishTest.emit()
  }
}
