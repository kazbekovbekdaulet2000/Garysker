import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { CommentModel } from '@core/models/api/comment.model';
import { ListResponseModel } from '@core/models/api/list.model';
import { ReportDetailModel, ReportModel } from '@core/models/api/report.model';
import { CommentsService } from '@core/services/comments.service';
import { AppState } from '@core/states/app/app.state';
import { AuthState } from '@core/states/auth/auth.state';
import { ClearComments, LikeComment, ListComments } from '@core/states/comments/comments.actions';
import { CommentsState } from '@core/states/comments/comments.state';
import { LangType } from '@core/types/lang.type';
import { Select, Store } from '@ngxs/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { LoginErrModalComponent } from 'src/app/shared/modals/noLogin-modal /login-modal.component';
import { LinkShareModalComponent } from 'src/app/shared/modals/share-modal/share-modal.component';
import { ClearRelatedReportList, ClearReportDetail, GetRelatedReports, GetReport, LikeReport, SaveReport } from '../report.actions';
import { ReportState } from '../report.state';
import { ReportCommentsComponent } from './comments/comments.component';

@Component({
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [opacityAnimation, heightAnimation]
})
export class ReportComponent implements OnDestroy {

  @Select(AuthState.access) access$!: Observable<string>;
  @Select(ReportState.report) report$!: Observable<ReportDetailModel>;
  @Select(AppState.lang) lang$!: Observable<LangType>;

  @ViewChild('body') body!: ElementRef<any>

  @ViewChild(ReportCommentsComponent) comments!: ReportCommentsComponent;

  reportId!: number;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private bsService: BsModalService,
    private meta: Meta,
    private title: Title,
  ) {
    window.scrollTo(0, 0)
    this.activatedRoute.params.subscribe(({ id }) => {
      this.reportId = id
      this.store.dispatch(new GetReport(id))
      this.store.dispatch(new ListComments('reports', id))
    })
    this.lang$.subscribe(lang => {
      this.store.select(ReportState.report).pipe(filter(obj => !!obj)).subscribe(report => {
        this.title.setTitle(lang === 'ru' ? report.title_ru : report.title_kk)
        this.meta.updateTag({ name: 'keywords', content: report.tags.join(", ") })
        this.meta.updateTag({ name: 'description', content: lang === 'ru' ? report.preview_text_ru : report.preview_text_kk })
        this.meta.updateTag({ property: 'og:description', content: lang === 'ru' ? report.preview_text_ru : report.preview_text_kk })
        this.meta.updateTag({ property: 'twitter:description', content: lang === 'ru' ? report.preview_text_ru : report.preview_text_kk })
        this.meta.updateTag({ name: 'robots', content: 'index, follow' })
        this.meta.updateTag({ name: 'author', content: report.author.email })
        this.meta.updateTag({ name: 'brand', content: 'Garyshker' })
        this.meta.updateTag({ property: "og:url", content: location.href })
        this.meta.updateTag({ property: 'og:type', content: 'website' })
        this.meta.updateTag({ name: 'twitter:title', content: lang === 'ru' ? report.title_ru : report.title_kk})
        this.meta.updateTag({ property: 'og:title', content: lang === 'ru' ? report.title_ru : report.title_kk })
        this.meta.updateTag({ property: 'og:image', content: report.image })
        this.meta.updateTag({ name: 'twitter:image', content: report.image })
      })
    })
  }

  ngOnDestroy(): void {
    this.store.dispatch([ClearReportDetail, ClearRelatedReportList, ClearComments])
  }

  postLike(reply: CommentModel) {
    this.store.dispatch(new LikeComment('reports', this.reportId!, reply.id))
  }

  likeReport(id: number) {
    this.access$.pipe(take(1)).subscribe(token => {
      if (token !== '') {
        this.store.dispatch(new LikeReport(id))
      } else {
        this.bsService.show(LoginErrModalComponent, { class: 'modal-dialog-centered' })
      }
    })
  }

  onSave(id: number) {
    this.access$.pipe(take(1)).subscribe(token => {
      if (token !== '') {
        this.store.dispatch(new SaveReport(id))
      } else {
        this.bsService.show(LoginErrModalComponent, { class: 'modal-dialog-centered' })
      }
    })
  }

  onComment() {
    this.comments.toComment()
  }

  onShare() {
    this.bsService.show(LinkShareModalComponent, { class: 'modal-dialog-centered' })
  }
}
