import { Injectable } from '@angular/core';
import { DobroProjectModel } from '@core/models/api/dobro-project.model';
import { QuestionModel } from '@core/models/api/question.model';
import { DobroService } from '@core/services/dobro.service';
import { SupportService } from '@core/services/support.service';
import { SidebarState } from '@core/states/sidebar/sidebar.state';
import getImageDimenstion from '@core/utils/image-size';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { combineLatest } from 'rxjs';
import { ReportState } from './edu/report-module/report.state';
import { VideoState } from './edu/video-module/video.state';
import {
  ClearDobroDetails,
  ClearPopular,
  GetDobroProject,
  ListDobroProjects,
  ListQuestions,
  UpdatePopular
} from './main.actions';


interface StateModel {
  popular: any[];
  dobro_projects: DobroProjectModel[] | [];
  dobro_project: DobroProjectModel | null;
  questions: QuestionModel[] | [],
}

const defaults = {
  popular: [],
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
  static popular({ popular }: StateModel): any[] | [] {
    return popular;
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

  @Action(UpdatePopular)
  UpdatePopular({ getState, patchState }: StateContext<StateModel>, { payload, type }: UpdatePopular) {
    combineLatest([
      this.store.select(VideoState.videos),
      this.store.select(ReportState.reports)
    ]).subscribe(data => {
      const list = data.reduce((prev: any, curr: any)=>{
        return [...prev, ...curr?.results]
      }, [])
      list.forEach(item=>{
        item.width = getImageDimenstion(item.image)
      })
      list.sort((a, b)=> b.views - a.views)
      patchState({popular: list})
    })
  }

  @Action(ClearPopular)
  ClearPopular({ patchState }: StateContext<StateModel>) {
    patchState({ popular: [] })
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
