import { Injectable } from '@angular/core';
import { DobroProjectModel } from '@core/models/api/dobro-project.model';
import { QuestionModel } from '@core/models/api/question.model';
import { DobroService } from '@core/services/dobro.service';
import { SupportService } from '@core/services/support.service';
import { SidebarState } from '@core/states/sidebar/sidebar.state';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { ListReports } from '../main/edu/report-module/report.actions';
import { ListVideos } from '../main/edu/video-module/video.actions';
import {
  ChangeCategory,
  ClearDobroDetails,
  GetDobroProject,
  ListDobroProjects,
  ListQuestions,
} from './main.actions';


interface StateModel {
  selectedCategory: number;
  dobro_projects: DobroProjectModel[] | [];
  dobro_project: DobroProjectModel | null;
  questions: QuestionModel[] | [],
}

const defaults = {
  selectedCategory: NaN,
  dobro_projects: [],
  dobro_project: null,
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
  static dobro_projects({ dobro_projects }: StateModel): DobroProjectModel[] | [] {
    return dobro_projects;
  }

  @Selector()
  static dobro_project({ dobro_project }: StateModel): DobroProjectModel | null {
    return dobro_project;
  }

  @Selector()
  static questions({ questions }: StateModel): QuestionModel[] | [] {
    return questions;
  }

  constructor(
    private store: Store,
    private dobroService: DobroService,
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
    patchState({ selectedCategory: id })
  }

  @Action(ListDobroProjects)
  ListDobroProjects({ getState, patchState }: StateContext<StateModel>) {
    const type = this.store.selectSnapshot(SidebarState.selected_dobro)
    this.dobroService.list()
      .toPromise()
      .then(dobro_projects => {
        if (type) {
          if (type === 1) {
            patchState({ dobro_projects: dobro_projects.filter(val => !val.is_completed) })
          } else if (type === 2) {
            patchState({ dobro_projects: dobro_projects.filter(val => val.is_completed) })
          }
        } else {
          patchState({ dobro_projects });
        }
      })
  }

  @Action(GetDobroProject)
  GetDobroProject({ getState, patchState }: StateContext<StateModel>, { id }: GetDobroProject) {
    this.dobroService.get(id)
      .toPromise()
      .then(dobro_project => {
        patchState({ dobro_project });
      })
  }

  @Action(ClearDobroDetails)
  ClearDobroDetails({ patchState }: StateContext<StateModel>) {
    patchState({ dobro_project: null })
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
