import { Injectable } from '@angular/core';
import { QuestionModel } from '@core/models/api/question.model';
import { SupportService } from '@core/services/support.service';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { ListCourses } from './edu/course-module/course.actions';
import { ListReports } from './edu/report-module/report.actions';
import { ListVideos } from './edu/video-module/video.actions';
import {
  ChangeCategory,
  ListQuestions,
} from './main.actions';


interface StateModel {
  selectedCategory: number;
  questions: QuestionModel[] | [],
}

const defaults = {
  selectedCategory: NaN,
  questions: [],
};

@State<StateModel>({
  name: 'Main',
  defaults
})
@Injectable()
export class MainState {

  @Selector()
  static selectedCategory({ selectedCategory }: StateModel): number {
    return selectedCategory;
  }

  @Selector()
  static questions({ questions }: StateModel): QuestionModel[] | [] {
    return questions;
  }

  constructor(
    private store: Store,
    private supportService: SupportService
  ) {
  }

  @Action(ChangeCategory)
  ChangeCategory({ getState, patchState }: StateContext<StateModel>, { id }: ChangeCategory) {
    let params = {}
    if (id) {
      params = { category: id }
    }
    this.store.dispatch(new ListReports(params))
    this.store.dispatch(new ListVideos(params))
    this.store.dispatch(new ListCourses(params))
    patchState({ selectedCategory: id })
  }

  @Action(ListQuestions)
  ListQuestions({ patchState }: StateContext<StateModel>) {
    this.supportService.listQuestions()
      .toPromise()
      .then(questions => {
        patchState({ questions })
      })
  }
}
