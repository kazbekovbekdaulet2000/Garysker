import { Component, Input } from '@angular/core';
import { heightOutAnimation } from '@core/animations/height-out-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { QuestionModel } from '@core/models/api/question.model';

@Component({
  selector: 'app-overview-faq',
  templateUrl: './overview-faq.component.html',
  styleUrls: ['./overview-faq.component.scss'],
  animations: [opacityAnimation, heightOutAnimation]
})
export class ProjectOverviewFAQComponent {

  @Input() questions: QuestionModel[] = [];
  selectedQuestion: number = NaN;

  onQuestion(id: number) {
    if (this.selectedQuestion === id) {
      this.selectedQuestion = NaN;
      return;
    }
    this.selectedQuestion = id;
  }
}