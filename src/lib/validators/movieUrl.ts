import * as Yup from 'yup';

export const MovieUrlSchema = Yup.object({
    episode: Yup.string().min(1, 'Lớn hơn 0').required('Bắt buộc'),
    movieParentId: Yup.string().required('Playlist là bắt buộc'),
});

export type MovieUrlValidation = Yup.InferType<typeof MovieUrlSchema>;
