import { Component } from '@angular/core';
import { expandAnimation } from '@core/animations/expand-animation';
import { heightOutAnimation } from '@core/animations/height-out-animation';
import { QuestionModel } from '@core/models/api/question.model';
import { SupportService } from '@core/services/support.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  animations: [expandAnimation, heightOutAnimation]
})
export class QuestionsComponent {

  questions: QuestionModel[];

  constructor(
    private supportService: SupportService,
  ) {
    this.supportService.listQuestions()
      .toPromise()
      .then(questions => {
        this.questions = questions
      })
  }

  selected: number[] = [];

  showHideAns(id: number) {
    if (this.selected.includes(id)) {
      this.selected = this.selected.filter(val => {
        return val !== id
      })
    } else {
      this.selected.push(id)
    }
  }
}
