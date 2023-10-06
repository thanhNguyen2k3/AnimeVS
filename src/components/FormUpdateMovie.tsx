'use client';

import { MovieInput } from '@/types/MovieInput';
import ButtonVariant from './ui/ButtonVariant';
import { Category, Movie, MoviePlaylist, MovieUrl, Nation, Season, Studio } from '@prisma/client';
import { useState } from 'react';
import AccordionUpload from './ui/AccordionUpload';
import AccordionCharactors from './ui/AccordionCharactors';
import { MovieSchema } from '@/lib/validators/movie';
import AccordionPlaylist from './ui/AccordionPlaylist';
import instance from '@/lib/axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { useYupValidationResolver } from '@/hooks/useValidation';
import FormHelperText from '@mui/material/FormHelperText';
import { toastErrorResponse, toastSuccessResponse } from '@/utils/toast';
import { useRouter } from 'next/navigation';
import { PrefetchKind } from 'next/dist/client/components/router-reducer/router-reducer-types';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

type Props = {
    studio: Studio[];
    season: Season[];
    nation: Nation[];
    moviePlaylist: MoviePlaylist[];
    movieUrls: MovieUrl[];
    movie: Movie;
    categories: Category[];
};

const qualityOption = ['HD', 'SD', 'FHD'];

const FormUpdateMovie = ({ moviePlaylist, nation, season, studio, movieUrls, movie, categories }: Props) => {
    const resolver = useYupValidationResolver(MovieSchema);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitted },
    } = useForm<MovieInput>({
        resolver,
        defaultValues: {
            name: movie.name,
            description: movie.description,
            director: movie.director,
            episode: movie.episode || '',
            quality: movie.quality,
            status: movie.status || '',
            showtime: movie.showtime,
            subname: movie.subname,
            nationId: movie.nationId || '',
            categoryId: movie.categoryId || '',
            seasonId: movie.seasonId || '',
            movieParentId: movie.movieParentId || '',
            studioId: movie.studioId || '',
            thumbnail: movie.thumbnail || '',
        },
    });

    const [images, setImages] = useState<string[]>(movie.images);
    const [thumbnail, setThumbnail] = useState<string>(movie.thumbnail!);
    const [characters, setCharacters] = useState<string[]>(movie.characters);

    const handleCreateMovie: SubmitHandler<MovieInput> = async (data) => {
        try {
            const res = await instance.patch(`/v1/post/movie/update/${movie.id}`, {
                ...data,
                images,
                thumbnail,
                characters,
            });

            if (res.status === 200) {
                toastSuccessResponse('Cập nhật thành công');
                router.prefetch('/', { kind: PrefetchKind.AUTO });
                router.back();
            }
        } catch (e) {
            toastErrorResponse('Có vấn đề 😥');
        }
    };

    return (
        <Box
            component={'form'}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            onSubmit={handleSubmit(handleCreateMovie)}
        >
            <TextField
                helperText={errors.name?.message}
                error={isSubmitted}
                {...register('name')}
                name="name"
                variant="outlined"
                label="Tên movie"
            />
            <TextField
                helperText={errors.subname?.message}
                error={isSubmitted}
                {...register('subname')}
                name="subname"
                variant="outlined"
                label="Phụ đề"
            />
            <TextField
                helperText={errors.description?.message}
                error={isSubmitted}
                {...register('description')}
                name="description"
                variant="outlined"
                label="Mô tả"
            />
            <TextField
                helperText={errors.director?.message}
                error={isSubmitted}
                {...register('director')}
                name="director"
                variant="outlined"
                label="Tác giả"
            />
            <TextField
                helperText={errors.showtime?.message}
                error={isSubmitted}
                {...register('showtime')}
                name="showtime"
                variant="outlined"
                label="Lịch chiếu"
            />

            <TextField
                helperText={errors.status?.message}
                error={isSubmitted}
                {...register('status')}
                name="status"
                variant="outlined"
                label="Trạng thái"
            />

            <TextField
                helperText={errors.episode?.message}
                error={isSubmitted}
                {...register('episode')}
                name="episode"
                variant="outlined"
                label="Thời lượng"
            />

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Chọn chất lượng</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    {...register('quality')}
                    name="quality"
                    label="Chọn chất lượng"
                    defaultValue={movie.quality}
                    error={isSubmitted}
                >
                    <MenuItem value="">-- Chọn --</MenuItem>
                    {qualityOption.map((quality) => (
                        <MenuItem key={quality} value={`${quality}`}>
                            {quality}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>{errors.quality?.message}</FormHelperText>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Thể loại</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    {...register('categoryId')}
                    name="categoryId"
                    defaultValue={''}
                    label="Thể loại"
                    error={isSubmitted}
                >
                    <MenuItem value="">-- Chọn --</MenuItem>
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={`${category.id}`}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>{errors.quality?.message}</FormHelperText>
            </FormControl>

            <AccordionCharactors characters={characters} setCharacters={setCharacters} />

            <AccordionUpload
                thumbnail={thumbnail}
                exsitThumbnail={movie.thumbnail!}
                exsitImages={movie.images}
                images={images}
                setThumbnail={setThumbnail}
                setImages={setImages}
            />

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Chọn quốc gia</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    {...register('nationId')}
                    name="nationId"
                    label="Chọn quốc gia"
                    error={isSubmitted}
                    defaultValue={movie.nationId}
                >
                    <MenuItem value="">-- Chọn --</MenuItem>

                    {nation.map((na) => (
                        <MenuItem key={na.id} value={`${na.id}`}>
                            {na.name}
                        </MenuItem>
                    ))}
                </Select>

                <FormHelperText>{errors.nationId?.message}</FormHelperText>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Chọn season</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    {...register('seasonId')}
                    name="seasonId"
                    label="Chọn season"
                    error={isSubmitted}
                    defaultValue={movie.seasonId}
                >
                    <MenuItem value="">-- Chọn --</MenuItem>
                    {season.map((sea) => (
                        <MenuItem key={sea.id} value={`${sea.id}`}>
                            {sea.name}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>{errors.seasonId?.message}</FormHelperText>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Chọn studio</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    {...register('studioId')}
                    name="studioId"
                    label="Chọn studio"
                    error={isSubmitted}
                    defaultValue={movie.studioId}
                >
                    <MenuItem value="">-- Chọn --</MenuItem>

                    {studio.map((stu) => (
                        <MenuItem key={stu.id} value={`${stu.id}`}>
                            {stu.name}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>{errors.studioId?.message}</FormHelperText>
            </FormControl>

            <AccordionPlaylist
                existPl={movie.movieParentId!}
                moviePlaylist={moviePlaylist}
                movieUrls={movieUrls}
                register={register}
            />

            <ButtonVariant type="submit" className="mt-4" title="Cập nhật" isLoading={isSubmitting} />
        </Box>
    );
};

export default FormUpdateMovie;
