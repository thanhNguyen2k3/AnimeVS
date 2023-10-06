import * as Yup from 'yup';

export const MoviePlaylistSchema = Yup.object({
    playlistName: Yup.string().required('bắt buộc'),
});

export type MoviePlaylistValidation = Yup.InferType<typeof MoviePlaylistSchema>;
