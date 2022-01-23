import { Injectable } from '@angular/core';
import { CommentModel } from '@core/models/api/comment.model';
import { DobroProjectModel } from '@core/models/api/dobro-project.model';
import { emptyListResponse, ListResponseModel } from '@core/models/api/list.model';
import { QuestionModel } from '@core/models/api/question.model';
import { ReportDetailModel, ReportModel } from '@core/models/api/report.model';
import { VideoModel } from '@core/models/api/video.model';
import { DobroService } from '@core/services/dobro.service';
import { ReportsService } from '@core/services/reports.service';
import { SupportService } from '@core/services/support.service';
import { VideosService } from '@core/services/videos.service';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { ClearDobroDetails, ClearReportDetail, GetDobroProject, GetReport, ListDobroProjects, ListQuestions, ListReportComments, ListReports, ListVideos, PostReportComment } from './main.actions';


interface StateModel {
  reports: ListResponseModel<ReportModel>;
  report: ReportDetailModel | null;
  videos: ListResponseModel<VideoModel>;
  comments: ListResponseModel<CommentModel>;
  dobro_projects: DobroProjectModel[] | [];
  dobro_project: DobroProjectModel | null;
  questions: QuestionModel[] | []
}

const defaults = {
  reports: emptyListResponse,
  report: null,
  videos: emptyListResponse,
  comments: emptyListResponse,
  dobro_projects: [],
  dobro_project: null,
  questions: []
};

@State<StateModel>({
  name: 'Main',
  defaults
})
@Injectable()
export class MainState {

  @Selector()
  static reports({ reports }: StateModel): ListResponseModel<ReportModel> {
    return reports;
  }

  @Selector()
  static report({ report }: StateModel): ReportDetailModel | null {
    return report;
  }

  @Selector()
  static videos({ videos }: StateModel): ListResponseModel<VideoModel> {
    return videos;
  }

  @Selector()
  static comments({ comments }: StateModel): ListResponseModel<CommentModel> {
    return comments;
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
    private reportService: ReportsService,
    private videoService: VideosService,
    private dobroService: DobroService,
    private supportService: SupportService
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

  @Action(GetReport)
  GetReport({ patchState }: StateContext<StateModel>, { id }: GetReport) {
    this.reportService.get(id)
      .toPromise()
      .then(report => {
        patchState({ report });
      })
  }

  @Action(ListReportComments)
  ListReportComments({ patchState }: StateContext<StateModel>, { id }: ListReportComments) {
    this.reportService.listComments(id)
      .toPromise()
      .then(comments => {
        patchState({ comments })
      })
  }

  @Action(PostReportComment)
  PostReportComment({ patchState }: StateContext<StateModel>, { id, payload }: PostReportComment) {
    this.reportService.postComment(id, payload)
      .toPromise()
      .then(comment => {
        console.log(comment)
        this.store.dispatch(new ListReportComments(id))
      })
  }

  @Action(ClearReportDetail)
  ClearReportDetail({ patchState }: StateContext<StateModel>) {
    patchState({ report: null });
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

  @Action(ListQuestions)
  ListQuestions({ patchState }: StateContext<StateModel>) {
    this.supportService.listQuestions()
      .toPromise()
      .then(questions => {
        patchState({ questions })
      })
  }
}
