import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { CommentModel } from '@core/models/api/comment.model';
import { ListResponseModel } from '@core/models/api/list.model';
import { VideoDetailModel } from '@core/models/api/video.model';
import { AuthState } from '@core/states/auth/auth.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LikeVideoComment, ListMoreVideoComments, PostVideoComment } from '../../video.actions';
import { VideoState } from '../../video.state';

@Component({
  selector: 'app-video-comments',
  templateUrl: './video-comments.component.html',
  styleUrls: ['./video-comments.component.scss'],
  animations: [opacityAnimation, heightAnimation]
})
export class VideoCommentsComponent {
  @Input() entity!: VideoDetailModel;

  @Select(VideoState.comments) comments$!: Observable<ListResponseModel<CommentModel>>;
  @Select(AuthState.access) access$!: Observable<string>;

  formGroup!: FormGroup;

  replyContent: any | null;

  textInputLarge: boolean = false;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.formGroup = this.formBuilder.group({
        body: [null, Validators.required],
        reply: [null],
        video: [id, Validators.required]
      })
    })

    this.comments$.subscribe(data=>{
      console.log(data)
    })
  }

  loadMore() {
    if (this.entity) {
      this.store.dispatch(new ListMoreVideoComments(this.entity.id))
    }
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

  removeReplyParent() {
    this.replyContent = null
  }

  sendComment() {
    const payload = this.formGroup.getRawValue()
    if (payload.body !== '' && payload.body !== null) {
      this.store.dispatch(new PostVideoComment(this.entity.id, payload))
      this.formGroup.patchValue({
        body: null,
        reply: null
      })
      this.replyContent = null
    } else {
      alert("нету коммента")
    }
  }

  likeComment(comment: CommentModel) {
    this.store.dispatch(new LikeVideoComment(this.entity.id, comment.id))
  }

  textareaTap() {
    this.textInputLarge = true
  }
}
