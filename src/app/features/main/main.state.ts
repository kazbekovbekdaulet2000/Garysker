import { Injectable } from '@angular/core';
import { DobroProjectModel } from '@core/models/api/dobro-project.model';
import { ReportModel } from '@core/models/api/report.model';
import { VideoModel } from '@core/models/api/video.model';
import { DobroService } from '@core/services/dobro.service';
import { ReportsService } from '@core/services/reports.service';
import { VideosService } from '@core/services/videos.service';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { ClearDobroDetails, GetDobroProject, ListDobroProjects, ListReports, ListVideos } from './main.actions';


interface StateModel {
  reports: ReportModel[] | [];
  videos: VideoModel[] | [];
  dobro_projects: DobroProjectModel[] | [];
  dobro_project: DobroProjectModel | null;
}

const defaults = {
  reports: [],
  videos: [],
  dobro_projects: [],
  dobro_project: null
};

@State<StateModel>({
  name: 'Main',
  defaults
})
@Injectable()
export class MainState {

  @Selector()
  static reports({ reports }: StateModel): ReportModel[] | [] {
    return reports;
  }

  @Selector()
  static videos({ videos }: StateModel): VideoModel[] | [] {
    return videos;
  }

  @Selector()
  static dobro_projects({ dobro_projects }: StateModel): DobroProjectModel[] | [] {
    return dobro_projects;
  }

  @Selector()
  static dobro_project({ dobro_project }: StateModel): DobroProjectModel | null {
    return dobro_project;
  }

  constructor(
    private store: Store,
    private reportService: ReportsService,
    private videoService: VideosService,
    private dobroService: DobroService,
  ) {
  }

  @Action(ListReports)
  ListReports({ getState, patchState }: StateContext<StateModel>) {
    this.reportService.list()
      .toPromise()
      .then(reports => {
        patchState({ reports });
      })
  }

  @Action(ListVideos)
  ListVideos({ getState, patchState }: StateContext<StateModel>) {
    this.videoService.list()
      .toPromise()
      .then(videos => {
        patchState({ videos });
      })
  }

  @Action(ListDobroProjects)
  ListDobroProjects({ getState, patchState }: StateContext<StateModel>) {
    this.dobroService.list()
      .toPromise()
      .then(dobro_projects => {
        patchState({ dobro_projects });
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

}
