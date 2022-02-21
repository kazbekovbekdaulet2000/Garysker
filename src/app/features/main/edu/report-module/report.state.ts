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
  GetRelatedReports,
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


interface StateModel {
  reports: ListResponseModel<ReportModel>;
  reports_related: ListResponseModel<ReportModel>;
  report: ReportDetailModel | null;
  comments: ListResponseModel<CommentModel>;
}

const defaults = {
  reports: emptyListResponse,
  reports_related: emptyListResponse,
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
  static reports({ reports }: StateModel): ListResponseModel<ReportModel> {
    return reports;
  }

  @Selector()
  static reports_related({ reports_related }: StateModel): ListResponseModel<ReportModel> {
    return reports_related;
  }

  @Selector()
  static report({ report }: StateModel): ReportDetailModel | null {
    return report;
  }

  @Selector()
  static comments({ comments }: StateModel): ListResponseModel<CommentModel> {
    return comments;
  }

  constructor(
    private store: Store,
    private reportService: ReportsService,
  ) {
  }

  @Action(ListReports)
  ListReports({ patchState }: StateContext<StateModel>, { params }: ListReports) {
    this.reportService.list(params)
      .subscribe(reports => {
        patchState({ reports });
      })
  }

  @Action(ListMoreReports)
  ListMoreReports({ patchState, getState }: StateContext<StateModel>) {
    if (getState().reports.next) {
      const pageNumber = Number(getState().reports.next.split('page=')[1])
      const params = { page: pageNumber }
      this.reportService.list(params)
        .subscribe(reports => {
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
      .subscribe(reports => {
        patchState({ reports });
      })
  }

  @Action(ListMoreSavedReports)
  ListMoreSavedReports({ patchState, getState }: StateContext<StateModel>) {
    if (getState().reports.next) {
      const pageNumber = Number(getState().reports.next.split('page=')[1])
      const params = { page: pageNumber }
      this.reportService.listSaved(params)
        .subscribe(reports => {
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
  GetReport({ patchState }: StateContext<StateModel>, { id }: GetReport) {
    this.reportService.get(id)
      .toPromise()
      .then(report => {
        patchState({ report });
      })
  }

  @Action(GetRelatedReports)
  GetRelatedReports({ patchState, getState }: StateContext<StateModel>, { id, params }: GetRelatedReports) {
    this.reportService.getRelated(id, params)
      .subscribe(reports_related => {
        const list = getState().reports_related
        list.count = reports_related.count
        list.next = reports_related.next
        list.previous = reports_related.previous
        list.results = [...list.results, ...reports_related.results]
        return patchState({ reports_related: list })
      })
  }

  @Action(LikeReport)
  LikeReport({ getState, patchState }: StateContext<StateModel>, { id }: LikeReport) {
    this.reportService.like(id)
      .subscribe(ans => {
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
      .subscribe(ans => {
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
  ListReportComments({ patchState }: StateContext<StateModel>, { id }: ListReportComments) {
    this.reportService.listComments(id)
      .toPromise()
      .then(comments => {
        patchState({ comments })
      })
  }

  @Action(ListMoreReportComments)
  ListMoreReportComments({ getState, patchState }: StateContext<StateModel>, { id }: ListMoreReportComments) {
    const next = getState().comments.next
    const page = next.split('page=')[1]
    if (page) {
      const params = { page }
      this.reportService.listComments(id, params)
        .subscribe(comments => {
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
      .subscribe(comment => {
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
      .subscribe(({ liked }) => {
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
  ClearReportDetail({ patchState, getState}: StateContext<StateModel>) {
    getState().reports_related.results = []
    patchState({ report: null, reports_related: emptyListResponse});
  }

  @Action(ClearReportList)
  ClearReportList({ patchState, getState }: StateContext<StateModel>) {
    patchState({ reports: emptyListResponse });
  }
}