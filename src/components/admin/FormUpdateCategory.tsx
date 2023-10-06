'use client';

import instance from '@/lib/axios';
import { toastErrorResponse, toastSuccessResponse } from '@/utils/toast';
import TextField from '@mui/material/TextField';
import ButtonVariant from '../ui/ButtonVariant';
import { useForm } from 'react-hook-form';
import { Category } from '@prisma/client';
import { useRouter } from 'next/navigation';

type ValueProps = {
    name: string;
};

type PageProps = {
    existingCategory: Category | null;
};

const FormUpdateCategory = ({ existingCategory }: PageProps) => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        resetField,
        formState: { isLoading },
    } = useForm<ValueProps>({
        defaultValues: {
            name: existingCategory?.name,
        },
    });

    const handleCreateCategory = async ({ name }: ValueProps) => {
        try {
            const res = await instance.patch(`/v1/category/${existingCategory?.id}`, {
                name,
            });

            if (res.status === 200) {
                router.back();
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

            <ButtonVariant isLoading={isLoading} type="submit" title="Lưu" className="mt-4" />
        </form>
    );
};

export default FormUpdateCategory;
