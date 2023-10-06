import { awaitLoading } from '@/utils/awaitLoading';
import { Comment, User } from '@prisma/client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type ExtenedComment = Comment & {
    user: User;
    replies: Comment[];
};

type CommentInput = {
    movieId: string;
    text: string;
    replyToId?: string;
};

export const commentApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:3000/api/`,
        fetchFn: async (...arg) => {
            await awaitLoading();
            return await fetch(...arg);
        },
    }),
    tagTypes: ['Comment'],
    endpoints: (builder) => ({
        getComments: builder.query<ExtenedComment[], void>({
            query: () => 'comment',
            providesTags: ['Comment'],
        }),

        createComment: builder.mutation<Comment, CommentInput>({
            query: ({ movieId, text, replyToId }: CommentInput) => ({
                url: 'comment',
                method: 'PATCH',
                body: {
                    movieId,
                    text,
                    replyToId,
                },
            }),
            invalidatesTags: ['Comment'],
        }),
    }),
});

export const { useGetCommentsQuery, useCreateCommentMutation } = commentApi;
