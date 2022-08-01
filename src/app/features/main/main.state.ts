import { Injectable } from '@angular/core';
import { QuestionModel } from '@core/models/api/question.model';
import { CourseService } from '@core/services/courses.service';
import { SupportService } from '@core/services/support.service';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
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
    private supportService: SupportService,
    private courseService: CourseService
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
    this.courseService.list(params).subscribe(()=>{})
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
