import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { CommentModel } from '@core/models/api/comment.model';
import { ListResponseModel } from '@core/models/api/list.model';
import { AuthState } from '@core/states/auth/auth.state';
import { Select, Store } from '@ngxs/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ClearReportDetail, LikeReportComment, ListMoreReportComments, PostReportComment, SaveReport } from '../../report.actions';
import { ReportState } from '../../report.state';

@Component({
  selector: 'app-report-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [opacityAnimation, heightAnimation]
})
export class ReportCommentsComponent implements OnInit {

  @Input() reportId!: number;
  @Input() report: any;

  @Select(AuthState.access) access$!: Observable<string>;
  @Select(ReportState.comments) comments$!: Observable<ListResponseModel<CommentModel>>;
  
  formGroup: FormGroup | any;
  replyContent: any | null;
  textInputLarge: boolean = false;

  constructor(
    private store: Store,
    private router: Router,
    private formBuilder: FormBuilder,
    private bsService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      body: [null, Validators.required],
      reply: [null],
      report: [this.reportId, Validators.required]
    })
  }

  navigateReport(id: number) {
    this.store.dispatch(ClearReportDetail)
    this.router.navigate(['/edu/reports', id])
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

  textareaTap() {
    this.textInputLarge = true
  }
}
