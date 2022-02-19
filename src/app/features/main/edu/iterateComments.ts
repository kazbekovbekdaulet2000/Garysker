import { CommentModel } from "@core/models/api/comment.model"

export default function iterateComments(comment: CommentModel, additionComent: CommentModel): CommentModel {
  if (comment.id === additionComent.reply) {
    comment.replies.push(additionComent)
    return comment
  } else {
    comment.replies.map(item => iterateComments(item, additionComent))
    return comment
  }
}