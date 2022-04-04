import { Component, EventEmitter, Input, Output } from '@angular/core';
import { heightOutAnimation } from '@core/animations/height-out-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { CommentModel } from '@core/models/api/comment.model';
import { UserModel } from '@core/models/api/user.model';
import { AuthState } from '@core/states/auth/auth.state';
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
  @Input() comment!: CommentModel;
  @Input() isReply: boolean = false;
  @Input() isLast: boolean = false;

  @Output() reply = new EventEmitter<CommentModel>();
  @Output() delete = new EventEmitter<CommentModel>();
  @Output() like = new EventEmitter<CommentModel>();

  constructor(
    private store: Store,
    private bsModalService: BsModalService
  ) { }

  addReply(value: CommentModel) {
    this.reply.emit(value)
  }

  deleteComment(value: CommentModel) {
    this.delete.emit(value)
  }

  patchComment(value: CommentModel) {

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

  get email(): string | undefined {
    return this.store.selectSnapshot(AuthState.profile)?.email
  }

  get is_superuser(): boolean | undefined {
    return this.store.selectSnapshot(AuthState.profile)?.is_superuser
  }

  get getCommentCount() {
    const prev = this.hideAns ? "Показать" : "Скрыть"
    if (this.comment.replies.length >= 1 && this.comment.replies.length <= 4) {
      return `${prev} ${this.comment.replies.length} ответа`
    } else if (this.comment.replies.length >= 5) {
      return `${prev} ${this.comment.replies.length} ответов`
    } else {
      return `${prev} ${this.comment.replies.length} ответ`
    }
  }
}
