'use client';

import instance from '@/lib/axios';
import { toastErrorResponse, toastSuccessResponse } from '@/utils/toast';
import TextField from '@mui/material/TextField';
import { FormEvent, useRef, useState } from 'react';
import ButtonVariant from './ui/ButtonVariant';
import { useForm } from 'react-hook-form';

type ValueProps = {
    name: string;
};

const FormCreateCategory = () => {
    const {
        register,
        handleSubmit,
        resetField,
        formState: { isLoading },
    } = useForm<ValueProps>();

    const handleCreateCategory = async ({ name }: ValueProps) => {
        try {
            const res = await instance.post('/v1/category', {
                name,
            });

            if (res.status === 200) {
                resetField('name');
                toastSuccessResponse('Thêm loại thành công');
            }
        } catch (error) {
            toastErrorResponse('Có vấn đề 😥');
        }
    };

    return (
        <form onSubmit={handleSubmit(handleCreateCategory)}>
            <TextField fullWidth variant="outlined" label="Tên thể loại" {...register('name')} required />

            <ButtonVariant isLoading={isLoading} type="submit" title="Thêm" className="mt-4" />
        </form>
    );
};

export default FormCreateCategory;
