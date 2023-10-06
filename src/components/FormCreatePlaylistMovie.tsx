'use client';

import ButtonVariant from '@/components/ui/ButtonVariant';
import { SyntheticEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useFormatBytes } from '@/utils/formater';
import InputLabel from '@mui/material/InputLabel';
import ListItemIcon from '@mui/material/ListItemIcon';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import ProgressPercent from '@/components/ui/loading/ProgressPercent';
import instance from '@/lib/axios';
import { MoviePlaylistSchema } from '@/lib/validators/playlist';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { useYupValidationResolver } from '@/hooks/useValidation';
import { toastErrorResponse, toastSuccessResponse } from '@/utils/toast';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

type ValuesProps = {
    playlistName: string;
};

const FormCreatePlaylistMovie = () => {
    const router = useRouter();

    const resolver = useYupValidationResolver(MoviePlaylistSchema);

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isSubmitted },
    } = useForm<ValuesProps>({
        resolver,
    });

    const [file, setFile] = useState<File>();
    const [trailerUrl, setTrailerUrl] = useState<string>('');
    const [mesage, setMessage] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [progress, setProgress] = useState<number | undefined>(0);

    const handleChangeFile = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;

        const file = target.files![0];
        setFile(file);
    };

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

    const handleUploadVideoToCloud = async () => {
        const formData = new FormData();
        formData.append('file', file!);
        formData.append('upload_preset', 'trailers');

        try {
            const res = await axios.post('https://api-ap.cloudinary.com/v1_1/dkyhn68qq/video/upload', formData, {
                onUploadProgress: ({ total, loaded }) => {
                    const percent = (loaded / total!) * 100;
                    setProgress(percent);
                    if (percent === 100) {
                        toastSuccessResponse('Đã thêm trailer vào playlist');
                    }
                },
            });

            const { url } = res.data;

            setTrailerUrl(url);
        } catch (error) {
            toastErrorResponse('Có vấn đề 😥');
        }
    };

    const handleSubmitForm = async ({ playlistName }: ValuesProps) => {
        try {
            if (!trailerUrl.startsWith('https://youtu.be')) {
                setMessage('Đường dẫn bắt buộc phải là ➡ https');
                setError(true);
            } else {
                const res = await instance.post('/v1/post/movie/playlist', {
                    playlistName,
                    trailer: trailerUrl,
                });

                if (res.status === 200) {
                    toastSuccessResponse('Đã thêm playlist');

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
                helperText={mesage}
                type="text"
                fullWidth
                label="Đường dẫn Trailer"
                required
                variant="outlined"
                onChange={(e) => handleChangeUrl(e)}
            />

            <Box component={'label'} className="hidden">
                <Box sx={{ mt: 2 }}>
                    <InputLabel>Trailer</InputLabel>
                    <TextField onChange={(e) => handleChangeFile(e)} type="file" />
                </Box>

                <Box sx={{ mt: 2 }}>
                    {file && (
                        <List>
                            <Typography variant="h6">Video của bạn</Typography>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemText primary={file?.name} />
                                    <ListItemText primary={useFormatBytes(file?.size as number)} />
                                    <ListItemText primary={'Vui lòng upload video lên Cloud ==▶'} />
                                    <ListItemIcon>
                                        <Tooltip title="Tải lên Cloud">
                                            <CloudUploadIcon onClick={handleUploadVideoToCloud} />
                                        </Tooltip>
                                    </ListItemIcon>
                                </ListItemButton>
                            </ListItem>

                            {progress! > 0 && <ProgressPercent progress={progress} />}
                        </List>
                    )}
                </Box>
            </Box>

            <ButtonVariant type="submit" isLoading={isSubmitting} className="mt-4" title="Thêm video" />
        </Box>
    );
};

export default FormCreatePlaylistMovie;
