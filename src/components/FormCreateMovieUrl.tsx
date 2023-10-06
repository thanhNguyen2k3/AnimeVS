'use client';

import ButtonVariant from './ui/ButtonVariant';
import { SyntheticEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useFormatBytes } from '@/utils/formater';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import ListItemIcon from '@mui/material/ListItemIcon';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import ProgressPercent from './ui/loading/ProgressPercent';
import { MovieUrlSchema } from '@/lib/validators/movieUrl';
import instance from '@/lib/axios';
import { MoviePlaylist } from '@prisma/client';
import MenuItem from '@mui/material/MenuItem';
import { useForm } from 'react-hook-form';
import { useYupValidationResolver } from '@/hooks/useValidation';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import { toastErrorResponse, toastSuccessResponse } from '@/utils/toast';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

type Props = {
    playlistMovie: MoviePlaylist[];
};

type ValuesProps = {
    episode: string;
    movieParentId: string;
};

const FormCreateUrlMovie = ({ playlistMovie }: Props) => {
    const resolver = useYupValidationResolver(MovieUrlSchema);
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitted, isSubmitting },
    } = useForm<ValuesProps>({
        resolver,
    });

    const [file, setFile] = useState<File>();
    const [movieUrl, setMovieUrl] = useState<string>('');
    const [progress, setProgress] = useState<number | undefined>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [mesage, setMessage] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const handleChangeFile = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;

        const file = target.files![0];
        setFile(file);
    };

    const handleUploadVideoToCloud = async () => {
        const formData = new FormData();
        formData.append('file', file!);
        formData.append('upload_preset', 'videos');

        try {
            const res = await axios.post('https://api-ap.cloudinary.com/v1_1/dkyhn68qq/video/upload', formData, {
                onUploadProgress: ({ total, loaded }) => {
                    const percent = (loaded / total!) * 100;
                    setProgress(percent);
                    if (percent === 100) {
                        if (percent !== 100) {
                            setLoading(false);
                        }
                        toastSuccessResponse('Upload thành công');
                    }
                },
            });

            const { url } = res.data;

            if (res.status === 200) {
                setLoading(true);
            }

            setMovieUrl(url);
        } catch (error) {
            toastErrorResponse('Có vấn đề gì đó 😥');
        }
    };

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

    const handleSubmitForm = async (data: ValuesProps) => {
        try {
            if (!movieUrl.startsWith('https://')) {
                setMessage('Đường dẫn bắt buộc phải là ➡ https');
                setError(true);
            } else {
                const res = await instance.post('/v1/post/movie/movie-url', {
                    ...data,
                    url: movieUrl,
                });

                if (res.status === 200) {
                    toastSuccessResponse('Đã thêm thành công');
                }
            }
        } catch (error) {
            toastErrorResponse('Có vấn đề gì đó 😥');
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
                    defaultValue={''}
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
                    <InputLabel>Tạo đường link video của bộ phim</InputLabel>
                    <Input onChange={(e) => handleChangeFile(e)} type="file" />
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
                                            <CloudUploadIcon
                                                htmlColor={loading ? '#003cff' : '#000'}
                                                onClick={handleUploadVideoToCloud}
                                            />
                                        </Tooltip>
                                    </ListItemIcon>
                                </ListItemButton>
                            </ListItem>

                            {progress! > 0 && <ProgressPercent progress={progress} />}
                        </List>
                    )}
                </Box>
            </Box>
            <ButtonVariant type="submit" isLoading={isSubmitting} className="mt-4" title="Thêm" />
        </Box>
    );
};

export default FormCreateUrlMovie;
