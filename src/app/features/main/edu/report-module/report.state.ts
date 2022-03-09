import { Injectable } from '@angular/core';
import { CommentModel } from '@core/models/api/comment.model';
import { emptyListResponse, ListResponseModel } from '@core/models/api/list.model';
import { ReportDetailModel, ReportModel } from '@core/models/api/report.model';
import { ReportsService } from '@core/services/reports.service';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import iterateComments from '../iterateComments';
import getComment from '../getComment';
import {
  ClearReportDetail,
  ClearReportList,
  ListRelatedReports,
  GetReport,
  LikeReport,
  LikeReportComment,
  ListMoreReportComments,
  ListMoreReports,
  ListMoreSavedReports,
  ListReportComments,
  ListReports,
  ListSavedReports,
  PostReportComment,
  SaveReport
} from './report.actions';
import { MainState } from '../../main.state';


interface StateModel {
  reports: ListResponseModel<ReportModel>;
  relatedReports: ListResponseModel<ReportModel>;
  report: ReportDetailModel | null;
  comments: ListResponseModel<CommentModel>;
}

const defaults = {
  reports: emptyListResponse,
  relatedReports: emptyListResponse,
  report: null,
  comments: emptyListResponse,
};

@State<StateModel>({
  name: 'Report',
  defaults
})
@Injectable()
export class ReportState {

  @Selector()
  static reports(state: StateModel): ListResponseModel<ReportModel> {
    return state.reports;
  }

  @Selector()
  static relatedReports(state: StateModel): ListResponseModel<ReportModel> {
    return state.relatedReports;
  }

  @Selector()
  static report(state: StateModel): ReportDetailModel | null {
    return state.report;
  }

  @Selector()
  static comments(state: StateModel): ListResponseModel<CommentModel> {
    return state.comments;
  }

  constructor(
    private store: Store,
    private reportService: ReportsService,
  ) {
  }

  @Action(ListReports)
  ListReports({ patchState }: StateContext<StateModel>, { params }: ListReports) {
    this.reportService.list(params)
      .toPromise()
      .then(reports => {
        patchState({ reports });
      })
  }

  @Action(ListMoreReports)
  ListMoreReports({ patchState, getState }: StateContext<StateModel>) {
    const categoryId = this.store.selectSnapshot(MainState.selectedCategory)
    if (getState().reports.next) {
      const pageNumber = Number(getState().reports.next.split('page=')[1])
      const params = { page: pageNumber, category: categoryId ? categoryId : '' }
      this.reportService.list(params)
        .toPromise()
        .then(reports => {
          const { count, results, next, previous } = reports
          const newReports = getState().reports
          newReports.count = count
          newReports.next = next
          newReports.results = [...newReports.results, ...results]
          newReports.previous = previous
          patchState({ reports: newReports })
        })
    }
  }

  @Action(ListSavedReports)
  ListSavedReports({ patchState }: StateContext<StateModel>) {
    this.reportService.listSaved()
      .toPromise()
      .then(reports => {
        patchState({ reports });
      })
  }

  @Action(ListMoreSavedReports)
  ListMoreSavedReports({ patchState, getState }: StateContext<StateModel>) {
    if (getState().reports.next) {
      const pageNumber = Number(getState().reports.next.split('page=')[1])
      const params = { page: pageNumber }
      this.reportService.listSaved(params)
        .toPromise()
        .then(reports => {
          const { count, results, next, previous } = reports
          const newReports = getState().reports
          newReports.count = count
          newReports.next = next
          newReports.results = [...newReports.results, ...results]
          newReports.previous = previous
          patchState({ reports: newReports })
        })
    }
  }

  @Action(GetReport)
  GetReport({ getState, patchState, setState }: StateContext<StateModel>, { id }: GetReport) {
    this.reportService.get(id)
      .toPromise()
      .then(report => {
        setState({ ...getState(), report: report });
      })
  }

  @Action(ListRelatedReports)
  ListRelatedReports({ patchState, setState, getState }: StateContext<StateModel>, { id, params }: ListRelatedReports) {
    patchState({reports: emptyListResponse})
    this.reportService.getRelated(id, params)
      .toPromise()
      .then(relatedReports => {
        const list = getState().relatedReports
        list.count = relatedReports.count
        list.next = relatedReports.next
        list.previous = relatedReports.previous
        list.results = [...list.results, ...relatedReports.results]
        setState({ ...getState(), relatedReports: list })
      })
  }

  @Action(LikeReport)
  LikeReport({ getState, patchState }: StateContext<StateModel>, { id }: LikeReport) {
    this.reportService.like(id)
      .toPromise().then(ans => {
        let newRep = getState().report
        newRep!.liked = ans?.liked
        if (newRep!.liked) {
          newRep!.likes_count += 1
        } else {
          newRep!.likes_count -= 1
        }
        patchState({ report: newRep })
      })
  }

  @Action(SaveReport)
  SaveReport({ getState, patchState }: StateContext<StateModel>, { id }: SaveReport) {
    this.reportService.save(id)
      .toPromise().then(ans => {
        let newRep = getState().report
        newRep!.bookmarked = ans?.bookmarked
        if (newRep!.bookmarked) {
          newRep!.bookmarks_count += 1
        } else {
          newRep!.bookmarks_count -= 1
        }
        patchState({ report: newRep })
      })
  }

  @Action(ListReportComments)
  ListReportComments({ patchState, setState, getState }: StateContext<StateModel>, { id }: ListReportComments) {
    this.reportService.listComments(id)
      .toPromise()
      .then(comments => {
        setState({ ...getState(), comments: comments })
      })
  }

  @Action(ListMoreReportComments)
  ListMoreReportComments({ getState, patchState }: StateContext<StateModel>, { id }: ListMoreReportComments) {
    const next = getState().comments.next
    const page = next.split('page=')[1]
    if (page) {
      const params = { page }
      this.reportService.listComments(id, params)
        .toPromise()
        .then(comments => {
          const list = getState().comments.results
          getState().comments.next = comments.next
          getState().comments.previous = comments.previous
          getState().comments.results = [...list, ...comments.results]
        })
    }
  }

  @Action(PostReportComment)
  PostReportComment({ getState, patchState }: StateContext<StateModel>, { id, payload }: PostReportComment) {
    this.reportService.postComment(id!, payload)
      .toPromise().then(comment => {
        getState().report!.comments_count += 1
        if (comment.reply) {
          getState().comments.results.map(item => iterateComments(item, comment))
        } else {
          const list = [...[comment], ...getState().comments.results]
          getState().comments.results = list
        }
      })
  }

  @Action(LikeReportComment)
  LikeReportComment({ getState, patchState }: StateContext<StateModel>, { reportId, commentId }: LikeReportComment) {
    this.reportService.likeComment(reportId, commentId)
      .toPromise().then(({ liked }) => {
        const comment = getComment(getState().comments.results, commentId)
        if (!comment) {
          return
        }
        if (liked) {
          comment!.likes_count += 1
        } else {
          comment!.likes_count -= 1
        }
        comment!.liked = liked
      })
  }

  @Action(ClearReportDetail)
  ClearReportDetail({ patchState, getState }: StateContext<StateModel>) {
    patchState({ report: null, relatedReports: emptyListResponse });
  }

  @Action(ClearReportList)
  ClearReportList({ patchState, getState }: StateContext<StateModel>) {
    patchState({ reports: emptyListResponse });
  }
}