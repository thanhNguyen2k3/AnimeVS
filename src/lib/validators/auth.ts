import * as Yup from 'yup';

export const authSchema = Yup.object({
    username: Yup.string().min(3).required('Username must be longer than 3 characters'),
    email: Yup.string().email().required('Email must be in the correct format'),
    password: Yup.string().min(3).max(20).required('Password must be longer than 3 characters'),
});

export const signinSchema = Yup.object({
    username: Yup.string().min(3).required('Username can not be blank'),
    password: Yup.string().min(3).max(20).required('Password can not be blank'),
});

export type AuthValidation = Yup.InferType<typeof authSchema>;
export type SigninValidation = Yup.InferType<typeof signinSchema>;
