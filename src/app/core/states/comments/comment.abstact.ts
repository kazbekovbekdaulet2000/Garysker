import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { CommentModel } from "@core/models/api/comment.model";
import { Store } from "@ngxs/store";
import { ListComments, PostComment } from "./comments.actions";

export abstract class CommentAbtract<T> {

  entityId: number = NaN

  type: 'videos' | 'reports' = 'reports'

  formGroup!: FormGroup
  replyContent: any | null;

  constructor(
    protected store: Store,
    protected activatedRoute: ActivatedRoute,
    protected formBuilder: FormBuilder
  ) {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.entityId = id
      this.formGroup = this.formBuilder.group({
        body: ['', Validators.required],
        reply: [null],
        report: [this.entityId, Validators.required]
      })
    })
  }

  patchReply(val: number | null) {
    this.formGroup.patchValue({
      reply: val,
    });
  }

  loadMore() {
    this.store.dispatch(new ListComments(this.type, this.entityId))
  }

  sendComment() {
    const payload = this.formGroup.getRawValue()
    if (payload.body !== '' && payload.body !== null) {
      this.store.dispatch(new PostComment('videos', this.entityId, payload))
      // this.increaseCount()
      this.formGroup.patchValue({
        body: null,
        reply: null
      })
      this.replyContent = null
    }
  }

  // addReply(reply: CommentModel) {
  //   this.store.dispatch(new PostComment('videos', this.videoId, reply))
  //   this.store.dispatch(IncreaseVideoComments)
  // }

  // postLike(reply: CommentModel) {
  //   this.store.dispatch(new LikeComment('videos', this.videoId!, reply.id))
  // }

  // deleteComment(comment: CommentModel) {
  //   const modal = this.bsModalService.show(ConfirmModalComponent, {
  //     initialState: {
  //       title: "",
  //       message: "app.comment.delete.title",
  //       false_ans: "app.comment.delete.false",
  //       true_ans: "app.comment.delete.true"
  //     },
  //     class: 'modal-dialog-centered'
  //   })

  //   modal.content!.onClose.subscribe(result => {
  //     if (result === true) {
  //       this.store.dispatch(new DeleteComment('videos', this.videoId, comment.id))
  //       this.store.dispatch(DecreaseVideoComments)
  //     }
  //   });
  // }

  // patchComment(comment: CommentModel) {
  //   this.store.dispatch(new PatchComment('videos', this.videoId, comment.id, comment))
  // }

  // removeReplyParent() {
  //   this.replyContent = null
  //   this.patchReply(null)
  // }

  // textareaTap() {
  //   this.textInputLarge = true
  // }

  // triggerFunction(event: any) {
  //   if (event.ctrlKey && event.key === 'Enter') {
  //     this.formGroup.patchValue({
  //       body: this.formGroup.get('body')?.value + '\n'
  //     })
  //   } else if (event.key === 'Enter') {
  //     event.preventDefault();
  //     this.sendComment();
  //   }
  // }

  // increaseCount(): void {
  // }

}
