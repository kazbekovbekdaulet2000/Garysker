import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { CommentModel } from '@core/models/api/comment.model';
import { ListResponseModel } from '@core/models/api/list.model';
import { VideoDetailModel } from '@core/models/api/video.model';
import { AuthState } from '@core/states/auth/auth.state';
import { Select, Store } from '@ngxs/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/shared/modals/confirm-modal/confirm-modal.component';
import { DeleteVideoComment, LikeVideoComment, ListMoreVideoComments, PostVideoComment } from '../../video.actions';
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

  @ViewChild('holder') holder!: ElementRef
  @ViewChild('input') textfield!: ElementRef;

  formGroup!: FormGroup;

  replyContent: any | null;

  textInputLarge: boolean = false;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private bsModalService: BsModalService
  ) {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.formGroup = this.formBuilder.group({
        body: [null, Validators.required],
        reply: [null],
        video: [id, Validators.required]
      })
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

      this.textfield.nativeElement.blur();
      this.textInputLarge = false

      this.formGroup.patchValue({
        reply: null,
      });
    } else {
      this.replyContent = reply

      window.scrollTo(0, this.holder.nativeElement.offsetTop - 120)
      this.textfield.nativeElement.focus();
      this.textInputLarge = true

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

  deleteComment(comment: CommentModel) {
    const modal = this.bsModalService.show(ConfirmModalComponent, {
      initialState: {
        title: "",
        message: "Вы уверены, что хотите удалить комментарии?",
        false_ans: "Нет, оставить",
        true_ans: "Да, удалить",
      },
      class: 'modal-dialog-centered'
    })

    modal.content!.onClose.subscribe(result => {
      if (result === true) {
        this.store.dispatch(new DeleteVideoComment(this.entity.id, comment.id))
      }
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

  textareaTap() {
    this.textInputLarge = true
  }
}
