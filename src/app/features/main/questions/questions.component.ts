import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { expandAnimation } from '@core/animations/expand-animation';
import { QuestionModel } from '@core/models/api/question.model';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ListQuestions } from '../main.actions';
import { MainState } from '../main.state';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  animations: [expandAnimation]
})
export class QuestionsComponent {

  @Select(MainState.questions) questions$!: Observable<QuestionModel[]>;

  constructor(
    private store: Store
  ) {
    this.store.dispatch(new ListQuestions)
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
    // this.selected = this.selected === id ? null : id;
  }
}
