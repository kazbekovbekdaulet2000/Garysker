import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { CommentModel } from '@core/models/api/comment.model';
import { ListResponseModel } from '@core/models/api/list.model';
import { VideoDetailModel } from '@core/models/api/video.model';
import { ModalService } from '@core/services/modal.service';
import { AuthState } from '@core/states/auth/auth.state';
import { DeleteComment, LikeComment, ListComments, PatchComment, PostComment } from '@core/states/comments/comments.actions';
import { CommentsState } from '@core/states/comments/comments.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DecreaseVideoComments, IncreaseVideoComments } from '../../video.actions';
import { VideoState } from '../../video.state';

@Component({
  selector: 'app-video-comments',
  templateUrl: './video-comments.component.html',
  styleUrls: ['./video-comments.component.scss'],
  animations: [opacityAnimation, heightAnimation]
})
export class VideoCommentsComponent {
  @Input() entity!: VideoDetailModel;

  videoId: number = NaN

  @Select(CommentsState.comments) comments$!: Observable<ListResponseModel<CommentModel>>;

  @Select(VideoState.video) video$!: Observable<VideoDetailModel>;
  @Select(AuthState.access) access$!: Observable<string>;

  @ViewChild('holder') holder!: ElementRef
  @ViewChild('input') textfield!: ElementRef;

  formGroup!: FormGroup;

  replyContent: any | null;

  textInputLarge: boolean = false;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService
  ) {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.videoId = id
      this.formGroup = this.formBuilder.group({
        body: ['', Validators.required],
        reply: [null],
        report: [this.videoId, Validators.required]
      })

    })
  }

  patchReply(val: number | null) {
    this.formGroup.patchValue({
      reply: val,
    });
  }

  loadMore() {
    this.store.dispatch(new ListComments('videos', this.videoId!))
  }

  sendComment() {
    const payload = this.formGroup.getRawValue()
    if (payload.body !== '' && payload.body !== null) {
      this.store.dispatch(new PostComment('videos', this.videoId, payload))
      this.store.dispatch(IncreaseVideoComments)
      this.formGroup.patchValue({
        body: null,
        reply: null
      })
      this.replyContent = null
    }
  }

  addReply(reply: CommentModel) {
    this.store.dispatch(new PostComment('videos', this.videoId, reply))
    this.store.dispatch(IncreaseVideoComments)
  }

  postLike(reply: CommentModel) {
    this.store.dispatch(new LikeComment('videos', this.videoId!, reply.id))
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
        this.store.dispatch(new DeleteComment('videos', this.videoId, comment.id))
        this.store.dispatch(DecreaseVideoComments)
      }
    })
  }

  patchComment(comment: CommentModel) {
    this.store.dispatch(new PatchComment('videos', this.videoId, comment.id, comment))
  }

  removeReplyParent() {
    this.replyContent = null
    this.patchReply(null)
  }

  textareaTap() {
    this.textInputLarge = true
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
