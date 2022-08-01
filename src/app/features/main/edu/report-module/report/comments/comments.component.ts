import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { CommentModel } from '@core/models/api/comment.model';
import { ListResponseModel } from '@core/models/api/list.model';
import { ReportDetailModel } from '@core/models/api/report.model';
import { CommentsService } from '@core/services/comments.service';
import { AuthState } from '@core/states/auth/auth.state';
import { ClearComments, DeleteComment, LikeComment, ListComments, PatchComment, PostComment } from '@core/states/comments/comments.actions';
import { CommentsState } from '@core/states/comments/comments.state';
import { Select, Store } from '@ngxs/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/shared/modals/confirm-modal/confirm-modal.component';
import { DecreaseReportComments, IncreaseReportComments } from '../../report.actions';
import { ReportState } from '../../report.state';

@Component({
  selector: 'app-report-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [opacityAnimation, heightAnimation]
})
export class ReportCommentsComponent implements OnDestroy {

  reportId: number = NaN;

  @Select(AuthState.access) access$!: Observable<string>;
  @Select(CommentsState.comments) comments$!: Observable<ListResponseModel<CommentModel>>;
  @Select(ReportState.report) report$!: Observable<ReportDetailModel>;

  @ViewChild('holder') holder!: ElementRef
  @ViewChild('input') textfield!: ElementRef;

  formGroup!: FormGroup;
  textInputLarge: boolean = false;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private bsModalService: BsModalService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.reportId = id
      this.formGroup = this.formBuilder.group({
        body: ['', Validators.required],
        reply: [null],
        report: [this.reportId, Validators.required]
      })
    })
  }

  ngOnDestroy(): void {
    this.store.dispatch(ClearComments)
  }

  loadMore() {
    this.store.dispatch(new ListComments('reports', this.reportId!))
  }

  sendComment() {
    const payload = this.formGroup.getRawValue()
    if (payload.body !== '' && payload.body !== null) {
      this.store.dispatch(new PostComment('reports', this.reportId, payload))
      this.store.dispatch(IncreaseReportComments)
      this.formGroup.patchValue({
        body: null,
        reply: null
      })
      this.removeComment()
    }
  }

  addReply(reply: CommentModel) {
    this.store.dispatch(new PostComment('reports', this.reportId, reply))
    this.store.dispatch(IncreaseReportComments)
  }

  patchComment(comment: CommentModel) {
    this.store.dispatch(new PatchComment('reports', this.reportId, comment.id, comment))
  }

  toComment() {
    window.scrollTo(0, this.holder.nativeElement.offsetTop - 120)
    this.textfield.nativeElement.focus();
    this.textInputLarge = true
  }

  removeComment() {
    this.textfield.nativeElement.blur();
    this.textInputLarge = false
  }

  postLike(reply: CommentModel) {
    this.store.dispatch(new LikeComment('reports', this.reportId!, reply.id))
  }

  deleteComment(comment: CommentModel) {
    const modal = this.bsModalService.show(ConfirmModalComponent, {
      initialState: {
        title: "",
        message: "app.comment.delete.title",
        false_ans: "app.comment.delete.false",
        true_ans: "app.comment.delete.true"
      },
      class: 'modal-dialog-centered'
    })

    modal.content!.onClose.subscribe(result => {
      if (result === true) {
        this.store.dispatch(new DeleteComment('reports', this.reportId, comment.id))
        this.store.dispatch(DecreaseReportComments)
      }
    });
  }

  removeReplyParent() {
    this.patchReply(null)
  }

  textareaTap() {
    this.textInputLarge = true
  }

  patchReply(val: number | null) {
    this.formGroup.patchValue({
      reply: val,
    });
  }

  triggerFunction(event: any) {
    if (event.ctrlKey && event.key === 'Enter') {
      this.formGroup.patchValue({
        body: this.formGroup.get('body')?.value + '\n'
      })
    } else if (event.key === 'Enter') {
      event.preventDefault();
      this.sendComment();
    }
  }
}
