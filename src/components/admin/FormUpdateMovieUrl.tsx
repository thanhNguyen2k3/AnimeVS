'use client';

import ButtonVariant from '../ui/ButtonVariant';
import { SyntheticEvent, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import { MovieUrlSchema } from '@/lib/validators/movieUrl';
import instance from '@/lib/axios';
import { MoviePlaylist, MovieUrl } from '@prisma/client';
import MenuItem from '@mui/material/MenuItem';
import { useForm } from 'react-hook-form';
import { useYupValidationResolver } from '@/hooks/useValidation';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import { toastErrorResponse, toastSuccessResponse } from '@/utils/toast';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

type Props = {
    playlistMovie: MoviePlaylist[];
    existingData: MovieUrl | null;
};

type ValuesProps = {
    episode: string;
    movieParentId: string;
};

const FormUpdateMovieUrl = ({ playlistMovie, existingData }: Props) => {
    const router = useRouter();

    const resolver = useYupValidationResolver(MovieUrlSchema);
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitted, isSubmitting },
    } = useForm<ValuesProps>({
        resolver,
        defaultValues: {
            episode: existingData?.episode,
            movieParentId: existingData?.movieParentId!,
        },
    });

    const [movieUrl, setMovieUrl] = useState<string>(existingData?.url!);
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
            setMovieUrl(target.value.trim());
            setMessage('');
        }
    };

    const handleSubmitForm = async ({ episode, movieParentId }: ValuesProps) => {
        try {
            if (!movieUrl.startsWith('https://')) {
                setMessage('Đường dẫn bắt buộc phải là ➡ https');
                setError(true);
            } else {
                const res = await instance.patch(`/v1/post/movie/movie-url/${existingData?.id}`, {
                    episode,
                    movieParentId,
                    url: movieUrl,
                });

                if (res.status === 200) {
                    toastSuccessResponse('Đường dẫn đã được cập nhật thành công');

                    router.push('/admin/video-url');
                }
            }
        } catch (error) {
            toastErrorResponse('Có vấn đề 😥');
        }
    };

    return (
        <Box component={'form'} onSubmit={handleSubmit(handleSubmitForm)}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Chọn Playlist</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    {...register('movieParentId')}
                    defaultValue={existingData?.movieParentId}
                    label="Chọn Playlist"
                    error={isSubmitted}
                >
                    <MenuItem value="">-- Chọn --</MenuItem>
                    {playlistMovie.map((playlist) => (
                        <MenuItem key={playlist.id} value={`${playlist.id}`}>
                            {playlist.playlistName}
                        </MenuItem>
                    ))}
                </Select>

                {isSubmitted && (
                    <FormHelperText className="text-red-500">{errors.movieParentId?.message}</FormHelperText>
                )}
            </FormControl>

            <TextField
                helperText={errors.episode?.message}
                error={isSubmitted}
                fullWidth
                sx={{ mt: 2 }}
                {...register('episode')}
                type="text"
                label="Tập phim"
            />

            <TextField
                sx={{ mt: 2 }}
                error={error}
                defaultValue={existingData?.url}
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

export default FormUpdateMovieUrl;
