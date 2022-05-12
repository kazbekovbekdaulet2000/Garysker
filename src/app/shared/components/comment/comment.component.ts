import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import app from '@assets/i18n/app/kk';
import { heightOutAnimation } from '@core/animations/height-out-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { CommentModel } from '@core/models/api/comment.model';
import { UserModel } from '@core/models/api/user.model';
import { AuthState } from '@core/states/auth/auth.state';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { LoginErrModalComponent } from 'src/app/shared/modals/noLogin-modal /login-modal.component';

@Component({
  selector: 'app-comment-module',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  animations: [opacityAnimation, heightOutAnimation]
})
export class CommentComponent {

  @Select(AuthState.access) access$!: Observable<string>;

  hideAns = true;
  editComment = false;
  replyComment = false;
  reply_ans = true;

  @Input() comment!: CommentModel;
  @Input() isReply: boolean = false;
  @Input() isLast: boolean = false;

  @Output() reply = new EventEmitter<any>();
  @Output() delete = new EventEmitter<CommentModel>();
  @Output() like = new EventEmitter<CommentModel>();

  @Output() patch = new EventEmitter<CommentModel>();

  formData = this.formBuilder.group({
    body: ['', Validators.required]
  })

  constructor(
    private store: Store,
    private bsModalService: BsModalService,
    private formBuilder: FormBuilder,
    private translate: TranslateService
  ) { }

  addReply(comment: CommentModel) {
    this.replyComment = !this.replyComment
    if (!this.replyComment) {
      return
    }
  }

  deleteComment(comment: CommentModel) {
    this.delete.emit(comment)
  }

  togglePatch(comment: CommentModel) {
    this.editComment = !this.editComment
    this.formData.patchValue({
      body: comment.body
    })
    if (this.editComment) {
      this.replyComment = false
    }
  }

  toggleReply() {
    this.replyComment = !this.replyComment
    if (this.replyComment) {
      this.editComment = false
    }
  }

  patchComment(comment: CommentModel) {
    this.formData.patchValue({
      body: this.comment.body
    })
  }

  showMore() {
    this.hideAns = !this.hideAns
  }

  likeComment(value: CommentModel) {
    this.access$.subscribe(val => {
      if (val !== "") {
        this.like.emit(value)
      } else {
        this.bsModalService.show(LoginErrModalComponent, { class: 'modal-dialog-centered' })
      }
    })
  }

  sendPatchComment(comment: CommentModel) {
    comment.body = this.formData.get('body')?.value
    this.patch.emit(comment)
    this.editComment = false
    this.formData.patchValue({
      body: ''
    })
  }

  sendPatchComment2(comment: CommentModel) {
    this.patch.emit(comment)
  }

  sendReplyComment(comment: any) {
    const newComment = {
      body: this.formData.get('body')?.value,
      reply: comment.id
    }
    this.reply.emit(newComment)
    this.replyComment = false
    this.hideAns = false
    this.formData.patchValue({
      body: ''
    })
  }

  sendReplyComment2(comment: CommentModel) {
    this.reply.emit(comment)
  }

  get email(): string | undefined {
    return this.store.selectSnapshot(AuthState.profile)?.email
  }

  get is_superuser(): boolean | undefined {
    return this.store.selectSnapshot(AuthState.profile)?.is_superuser
  }

  get getCommentCount() {
    if (this.translate.currentLang === 'ru') {
      const prev = this.hideAns ? "Показать" : "Скрыть"
      if (this.comment.replies.length >= 1 && this.comment.replies.length <= 4) {
        return `${prev} ${this.comment.replies.length} ответа`
      } else if (this.comment.replies.length >= 5) {
        return `${prev} ${this.comment.replies.length} ответов`
      } else {
        return `${prev} ${this.comment.replies.length} ответ`
      }
    } else {
      return this.getCommentCount_kk
    }
  }

  get getCommentCount_kk() {
    return `${this.comment.replies.length} жауап`
  }
}
