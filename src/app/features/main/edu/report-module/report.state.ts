import { Injectable } from '@angular/core';
import { CommentModel } from '@core/models/api/comment.model';
import { emptyListResponse, ListResponseModel } from '@core/models/api/list.model';
import { ReportDetailModel, ReportModel } from '@core/models/api/report.model';
import { ReportsService } from '@core/services/reports.service';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import {
  ClearReportDetail,
  GetReport,
  LikeReport,
  ListMoreReportComments,
  ListReportComments,
  ListReports,
  ListSavedReports,
  PostReportComment,
  SaveReport
} from './report.actions';


interface StateModel {
  reports: ListResponseModel<ReportModel>;
  report: ReportDetailModel | null;
  comments: ListResponseModel<CommentModel>;
}

const defaults = {
  reports: emptyListResponse,
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
  ListReports({ patchState }: StateContext<StateModel>) {
    this.reportService.list()
      .subscribe(reports => {
        patchState({ reports });
      })
  }

  @Action(ListSavedReports)
  ListSavedReports({ patchState }: StateContext<StateModel>) {
    this.reportService.listSaved()
      .subscribe(reports => {
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
        const report = getState().report
        report!.comments_count += 1
        if (comment.reply) {
          getState().comments.results.map(item => iterateComments(item, comment))
        } else {
          const list = [...[comment], ...getState().comments.results]
          getState().comments.results = list
        }
      })
  }

  @Action(ClearReportDetail)
  ClearReportDetail({ patchState }: StateContext<StateModel>) {
    patchState({ report: null });
  }
}

export default function iterateComments(comment: CommentModel, additionComent: CommentModel): CommentModel {
  if (comment.id === additionComent.reply) {
    comment.replies.push(additionComent)
    return comment
  } else {
    comment.replies.map(item => iterateComments(item, additionComent))
    return comment
  }
}