import * as Yup from 'yup';

export const CategoryOnMovieSchema = Yup.object({
    categoryId: Yup.string().required('Playlist là bắt buộc'),
});
