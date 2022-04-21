import { Injectable } from '@angular/core';
import { emptyListResponse, ListResponseModel } from '@core/models/api/list.model';
import { ReportDetailModel, ReportModel } from '@core/models/api/report.model';
import { ReportsService } from '@core/services/reports.service';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import {
  ClearRelatedReportList,
  ClearReportDetail,
  ClearReportList,
  DecreaseReportComments,
  GetRelatedReports,
  GetReport,
  IncreaseReportComments,
  LikeReport,
  ListMoreReports,
  ListMoreSavedReports,
  ListReports,
  ListSavedReports,
  SaveReport
} from './report.actions';
import { MainState } from '../../main.state';


interface StateModel {
  reports: ListResponseModel<ReportModel>;
  related_reports: ListResponseModel<ReportModel>;
  report: ReportDetailModel | null;
}

const defaults = {
  reports: emptyListResponse,
  related_reports: emptyListResponse,
  report: null,
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
  static related_reports({ related_reports }: StateModel): ListResponseModel<ReportModel> {
    return related_reports;
  }

  @Selector()
  static report({ report }: StateModel): ReportDetailModel | null {
    return report;
  }

  constructor(
    private store: Store,
    private reportService: ReportsService,
  ) { }

  @Action(ListReports)
  ListReports({ patchState }: StateContext<StateModel>, { params }: ListReports) {
    this.reportService.list(params)
      .subscribe(reports => {
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
      .subscribe(related_reports => {
        // const list = getState().related_reports
        // list.count = related_reports.count
        // list.next = related_reports.next
        // list.previous = related_reports.previous
        // list.results = [...list.results, ...related_reports.results]
        return patchState({ related_reports })
      })
  }

  @Action(IncreaseReportComments)
  IncreaseReportComments({ getState }: StateContext<StateModel>) {
    getState().report!.comments_count++
  }

  @Action(DecreaseReportComments)
  DecreaseReportComments({ getState }: StateContext<StateModel>) {
    getState().report!.comments_count--
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

  @Action(ClearReportDetail)
  ClearReportDetail({ patchState }: StateContext<StateModel>) {
    patchState({ report: null });
  }

  @Action(ClearRelatedReportList)
  ClearRelatedReportList({ patchState }: StateContext<StateModel>) {
    patchState({ related_reports: emptyListResponse });
  }

  @Action(ClearReportList)
  ClearReportList({ patchState, getState }: StateContext<StateModel>) {
    patchState({ reports: emptyListResponse });
  }
}