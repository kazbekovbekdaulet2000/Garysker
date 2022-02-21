import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { CommentModel } from '@core/models/api/comment.model';
import { ListResponseModel } from '@core/models/api/list.model';
import { ReportDetailModel, ReportModel } from '@core/models/api/report.model';
import { AuthState } from '@core/states/auth/auth.state';
import { Select, Store } from '@ngxs/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { LoginErrModalComponent } from 'src/app/shared/modals/noLogin-modal /login-modal.component';
import { LinkShareModalComponent } from 'src/app/shared/modals/share-modal/share-modal.component';
import { ClearReportDetail, ClearReportList, GetRelatedReports, GetReport, LikeReport, LikeReportComment, ListMoreReportComments, ListMoreReports, ListReportComments, PostReportComment, SaveReport } from '../report.actions';
import { ReportState } from '../report.state';

@Component({
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [opacityAnimation, heightAnimation]
})
export class ReportComponent implements OnDestroy {

  @Select(AuthState.access) access$!: Observable<string>;
  @Select(ReportState.report) report$!: Observable<ReportDetailModel>;
  @Select(ReportState.comments) comments$!: Observable<ListResponseModel<CommentModel>>;
  @Select(ReportState.reports_related) reports$!: Observable<ListResponseModel<ReportModel>>;

  @ViewChild('body') body!: ElementRef<any>

  replyContent: any | null

  formGroup: FormGroup | any;
  reportId!: number;

  textInputLarge: boolean = false;

  page: number = 1;
  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private bsService: BsModalService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.reportId = id
      this.store.dispatch(new GetReport(id))
      this.store.dispatch(new ListReportComments(id))
      this.store.dispatch(new GetRelatedReports(id, { page: this.page }))

      this.formGroup = this.formBuilder.group({
        body: [null, Validators.required],
        reply: [null],
        report: [id, Validators.required]
      })

    })
  }

  ngOnDestroy(): void {
    this.store.dispatch(ClearReportDetail)
  }

  onScroll() {
    this.reports$.subscribe(data => {
      if (data.next) {
        const page = data.next.split('page=')[1]
        this.store.dispatch(new GetRelatedReports(this.reportId, { page: page }))
      }
    })
  }

  sendComment() {
    const payload = this.formGroup.getRawValue()
    if (payload.body !== '' && payload.body !== null) {
      this.store.dispatch(new PostReportComment(this.reportId, payload))
      this.formGroup.patchValue({
        body: null,
        reply: null
      })
      this.replyContent = null
    } else {
      alert("нету коммента")
    }
  }

  loadMore() {
    this.store.dispatch(new ListMoreReportComments(this.reportId!))
  }

  addReply(reply: CommentModel) {
    if (this.replyContent?.id === reply.id) {
      this.replyContent = null
      this.formGroup.patchValue({
        reply: null,
      });
    } else {
      this.replyContent = reply
      this.formGroup.patchValue({
        reply: this.replyContent.id,
      });
    }
  }

  postLike(reply: CommentModel) {
    this.store.dispatch(new LikeReportComment(this.reportId!, reply.id))
  }

  removeReplyParent() {
    this.replyContent = null
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

  get getLink() {
    return `https://www.youtube.com/sharer/sharer.php?u=${window.location.href}`
  }

  navigateReport(id: number){
    // [routerLink]="['/edu/reports', report.id]"
    this.store.dispatch(new ClearReportDetail)
    this.router.navigate(['/edu/reports', id])
  }

  onShare() {
    this.bsService.show(LinkShareModalComponent, { class: 'modal-dialog-centered' })
  }

  textareaTap() {
    this.textInputLarge = true
  }
}
