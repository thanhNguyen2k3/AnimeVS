import * as Yup from 'yup';

export const MovieSchema = Yup.object({
    name: Yup.string().min(2, 'Tên phim phải lớn hơn hai ký tự').required('Bắt buộc'),
    subname: Yup.string().min(2, 'phải lớn hơn hai ký tự').required('Bắt buộc'),
    description: Yup.string().min(2, 'phải lớn hơn hai ký tự').required('Bắt buộc'),
    director: Yup.string().required('Bắt buộc'),
    quality: Yup.string().required('Bắt buộc'),
    episode: Yup.string().required('Bắt buộc'),
    studioId: Yup.string().required('Bắt buộc'),
    nationId: Yup.string().required('Bắt buộc'),
    seasonId: Yup.string().required('Bắt buộc'),
});

export type MovieValidation = Yup.InferType<typeof MovieSchema>;
