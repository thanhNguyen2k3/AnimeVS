import * as Yup from 'yup';

export const CommentValidator = Yup.object({
    movieId: Yup.string(),
    text: Yup.string(),
    replyToId: Yup.string(),
    userId: Yup.string()
});
export type CommentRequest = Yup.InferType<typeof CommentValidator>;
