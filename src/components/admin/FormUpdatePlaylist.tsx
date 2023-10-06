'use client';

import ButtonVariant from '@/components/ui/ButtonVariant';
import { SyntheticEvent, useState } from 'react';
import Box from '@mui/material/Box';
import instance from '@/lib/axios';
import { MoviePlaylistSchema } from '@/lib/validators/playlist';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { useYupValidationResolver } from '@/hooks/useValidation';
import { toastErrorResponse, toastSuccessResponse } from '@/utils/toast';
import { useRouter } from 'next/navigation';
import { MoviePlaylist } from '@prisma/client';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

type Props = {
    existingData: MoviePlaylist | null;
};

type ValuesProps = {
    playlistName: string;
};

const FormUpdatePlaylist = ({ existingData }: Props) => {
    const router = useRouter();

    const resolver = useYupValidationResolver(MoviePlaylistSchema);

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isSubmitted },
    } = useForm<ValuesProps>({
        resolver,
        defaultValues: {
            playlistName: existingData?.playlistName!,
        },
    });

    const [trailerUrl, setTrailerUrl] = useState<string>(existingData?.trailer!);
    const [mesage, setMessage] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const handleChangeUrl = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;

        const checkValue = target.value.startsWith('https://');

        if (!checkValue) {
            setMessage('Đường dẫn bắt buộc phải là ➡ https');
            setError(true);
        } else {
            setError(false);
            setTrailerUrl(target.value.trim());
            setMessage('');
        }
    };

    const handleSubmitForm = async ({ playlistName }: ValuesProps) => {
        try {
            if (!trailerUrl.startsWith('https://youtu.be')) {
                setMessage('Đường dẫn bắt buộc phải là ➡ https');
                setError(true);
            } else {
                const res = await instance.patch(`/v1/post/movie/playlist/${existingData?.id}`, {
                    playlistName,
                    trailer: trailerUrl,
                });

                if (res.status === 200) {
                    toastSuccessResponse(' Playlist đã được cập nhật thành công');

                    router.push('/admin/playlist');
                }
            }
        } catch (error) {
            toastErrorResponse('Có vấn đề 😥');
        }
    };

    return (
        <Box component={'form'} onSubmit={handleSubmit(handleSubmitForm)}>
            <TextField
                fullWidth
                {...register('playlistName')}
                variant="outlined"
                label="Tên Playlist"
                helperText={errors.playlistName?.message}
                error={isSubmitted}
            />

            <TextField
                sx={{ mt: 2 }}
                error={error}
                defaultValue={existingData?.trailer}
                helperText={mesage}
                type="text"
                fullWidth
                label="Đường dẫn Trailer"
                required
                variant="outlined"
                onChange={(e) => handleChangeUrl(e)}
            />

            <ButtonVariant type="submit" isLoading={isSubmitting} className="mt-4" title="Lưu" />
        </Box>
    );
};

export default FormUpdatePlaylist;
