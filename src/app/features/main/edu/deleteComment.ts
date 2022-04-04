import { CommentModel } from "@core/models/api/comment.model"

export default function deleteComment(comments: CommentModel[], commentId: number): CommentModel[] {
  if (comments.find(val => val.id === commentId)) {
    return comments.filter(val => val.id !== commentId)
  }
  for (let i = 0; i < comments.length; ++i) {
    if (comments[i].replies.length > 0) {
      comments[i].replies = deleteComment(comments[i].replies, commentId)
    }
  }
  return comments
}