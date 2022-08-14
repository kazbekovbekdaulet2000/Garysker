import { Component, ElementRef, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { CommentModel } from '@core/models/api/comment.model';
import { emptyListResponse, ListResponseModel } from '@core/models/api/list.model';
import { CommentsService2 } from '@core/services/comments-2.service';
import { ModalService } from '@core/services/modal.service';
import { AuthState } from '@core/states/auth/auth.state';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import deleteComment from 'src/app/features/main/edu/deleteComment';
import iterateComments from 'src/app/features/main/edu/iterateComments';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  animations: [opacityAnimation, heightAnimation]
})
export class CommentListComponent implements OnInit, OnDestroy {

  @Input() entityId: number;
  @Input() marginTop: boolean = true
  @Select(AuthState.authorized) authorized$!: Observable<boolean>;

  comments: ListResponseModel<CommentModel> = emptyListResponse

  commentsSubs: Subscription;

  page: number = 1;

  formGroup: FormGroup;

  textInputLarge: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private commentsService: CommentsService2
  ) { }

  ngOnInit(): void {
    this.onListUpdate(this.page)
    this.formGroup = this.formBuilder.group({
      body: [null, Validators.required],
      reply: [null]
    })
  }

  onListUpdate(page: number) {
    let params = { page, page_size: 10 }
    this.commentsSubs = this.commentsService.list(this.entityId, params).subscribe(comments => {
      this.comments = { ...comments, results: [...this.comments.results, ...comments.results] }
    })
  }

  loadMore() {
    if (!this.comments.next) {
      return;
    }
    this.page++;
    this.onListUpdate(this.page)
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
        this.comments.results = [comment, ...this.comments.results]
        this.comments.count++;
        this.formGroup.reset()
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
        this.comments.count++
        if (comment.reply) {
          this.comments.results.map(item => iterateComments(item, comment))
        } else {
          const list = [comment, ...this.comments.results]
          this.comments.results = list
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
          this.comments = {
            ...this.comments,
            count: this.comments.count-1,
            results: deleteComment(this.comments.results, comment.id)
          }
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.comments = emptyListResponse;
    this.commentsSubs.unsubscribe()
  }
}
