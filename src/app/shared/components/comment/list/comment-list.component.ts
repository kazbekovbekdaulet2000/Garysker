import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListAbstract } from '@core/abstract/list.abstract';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { CommentModel } from '@core/models/api/comment.model';
import { ListResponseModel } from '@core/models/api/list.model';
import { CommentsService } from '@core/services/comments.service';
import { ModalService } from '@core/services/modal.service';
import { AuthState } from '@core/states/auth/auth.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import deleteComment from 'src/app/features/main/edu/deleteComment';
import iterateComments from 'src/app/features/main/edu/iterateComments';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  animations: [opacityAnimation, heightAnimation]
})
export class CommentListComponent extends ListAbstract<CommentModel> implements OnInit, OnDestroy {
  @Input() entityId: number;
  @Input() marginTop: boolean = true;
  @Output() newComment = new EventEmitter<'increase' | 'decrease'>();

  @Select(AuthState.authorized) authorized$: Observable<boolean>;

  formGroup: FormGroup;

  textInputLarge: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private commentsService: CommentsService
  ) {
    super();
  }

  get listAction(): Observable<ListResponseModel<CommentModel>> {
    return this.commentsService.list(this.entityId, this.params)
  }

  ngOnInit(): void {
    this.init();
    this.formGroup = this.formBuilder.group({
      body: [null, Validators.required],
      reply: [null]
    })
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

  sendComment() {
    if (this.formGroup.valid) {
      const payload = this.formGroup.getRawValue()
      this.commentsService.post(this.entityId, payload).subscribe((comment) => {
        this.list.results = [comment, ...this.list.results]
        this.list.count++;
        this.formGroup.reset();
        this.newComment.emit('increase')
      })
    }
  }

  postLike(comment: CommentModel) {
    this.commentsService.like(this.entityId, comment.id)
      .subscribe(({ liked }) => {
        if (liked) {
          comment.likes_count++
        } else {
          comment.likes_count--
        }
        comment.liked = liked
      })
  }

  patchComment(comment: CommentModel) {
    this.commentsService.patch(this.entityId, comment.id, comment)
      .subscribe(patchedComment => {
        comment.body = patchedComment.body
      })
  }

  addReply(reply: any) {
    this.commentsService.post(this.entityId, reply)
      .subscribe(comment => {
        this.list.count++
        if (comment.reply) {
          this.list.results.map(item => iterateComments(item, comment))
        } else {
          const list = [comment, ...this.list.results]
          this.list.results = list
        }
      })
  }

  deleteComment(comment: CommentModel) {
    this.modalService.showConfirmDialog({
      icon: 'stickers/sticker2',
      title: '',
      cancelText: 'app.comment.delete.false',
      confirmText: 'app.comment.delete.true',
      position: 'center',
      message: 'app.comment.delete.title',
      onConfirm: () => {
        this.commentsService.delete(this.entityId, comment.id).subscribe(() => {
          this.list = {
            ...this.list,
            count: this.list.count - 1,
            results: deleteComment(this.list.results, comment.id)
          }
          this.newComment.emit('decrease')
        })
      }
    })
  }
}
