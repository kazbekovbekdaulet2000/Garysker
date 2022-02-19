import { CommentModel } from "@core/models/api/comment.model"

export default function getComment(comments: CommentModel[], commentId: number): CommentModel | undefined{
  if (comments.find(val => val.id === commentId)) {
    return comments.find(val => val.id === commentId)
  }
  for (let i = 0; i < comments.length; ++i) {
    if(comments[i].replies.length > 0){
      return getComment(comments[i].replies, commentId)
    }
  }
  return undefined
}