import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Dispatch, SetStateAction, SyntheticEvent, useEffect, useState } from 'react';
import UploadFiles from '../UploadFiles';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ButtonVariant from './ButtonVariant';
import axios, { AxiosError } from 'axios';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { toastErrorResponse, toastSuccessResponse } from '@/utils/toast';

type PropsUpload = {
    setImages: Dispatch<SetStateAction<string[]>>;
    setThumbnail: Dispatch<SetStateAction<string>>;
    images: string[];
    thumbnail: string;
    exsitThumbnail?: string;
    exsitImages?: string[];
};

const AccordionUpload = ({ setImages, setThumbnail, images, thumbnail, exsitImages, exsitThumbnail }: PropsUpload) => {
    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [imgLink, setImgLink] = useState<string>('');
    const [file, setFile] = useState<any & { preview: string }>({
        preview: '',
    });

    useEffect(() => {
        return () => URL.revokeObjectURL(file.preview);
    }, []);

    const handleUploadFilesToClound = async () => {
        try {
            setLoading(true);

            for (const file of files) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'uploads');

                const res = await axios.post('https://api-ap.cloudinary.com/v1_1/dkyhn68qq/image/upload', formData);

                const { url } = res.data;

                if (res.status === 200) {
                    toastSuccessResponse('Tải ảnh lên thành công');
                }

                setImages((prev) => [...prev, url]);

                setLoading(false);
            }
        } catch (error) {
            if (error) {
                toastErrorResponse('Tải ảnh có vấn đề');
            }
        }
    };

    const handleRemoveLink = (index: number) => {
        setImages((prev) => [...prev.filter((_link, i) => i !== index)]);
    };

    const handleCreateLink = () => {
        setImages((prev) => [...prev, imgLink]);
        setImgLink('');
    };

    const handleChangeThumbnail = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;

        const file = target.files![0];

        setFile(
            Object.assign(file, {
                preview: URL.createObjectURL(file),
            }),
        );
    };

    const handleUploadThumbnailToClound = async () => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'thumbnails');

        try {
            const res = await axios.post('https://api-ap.cloudinary.com/v1_1/dkyhn68qq/image/upload', formData);
            const { url } = res.data;

            setThumbnail(url);

            if (res.status === 200) {
                toastSuccessResponse('Đã tải lên thumbnail');
            }
        } catch (e) {
            const error = e as AxiosError;

            if (error) {
                toastErrorResponse('Có vấn đề 😥');
            }
        }
    };

    return (
        <Box>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>Tải lên nhiều ảnh</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box className="flex gap-6 flex-wrap">
                        <Box className="flex-1">
                            <FormControl>
                                <FormLabel sx={{ mt: 2 }}>Tải ảnh lên</FormLabel>
                                <UploadFiles files={files} setFiles={setFiles} />
                                {files.length > 0 && (
                                    <ButtonVariant
                                        title="Tải lên"
                                        type="button"
                                        isLoading={loading}
                                        handleClick={handleUploadFilesToClound}
                                    />
                                )}
                            </FormControl>

                            <Typography variant="h6" className="my-2">
                                Hoặc
                            </Typography>

                            {images.length > 0 && (
                                <List>
                                    {images.map((name, i) => (
                                        <ListItem key={i} disablePadding className="truncate">
                                            <ListItemButton>
                                                <ListItemText className="truncate" primary={name.slice(0, 20)} />
                                                <ListItemIcon>
                                                    <DeleteIcon onClick={() => handleRemoveLink(i)} />
                                                </ListItemIcon>
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                            <TextField value={imgLink} onChange={(e) => setImgLink(e.target.value)} />
                            <ButtonVariant
                                variant="outlined"
                                className="ml-2"
                                title="Thêm"
                                handleClick={handleCreateLink}
                            />
                        </Box>

                        {exsitImages?.length! > 0 && (
                            <ImageList sx={{ width: 500, height: 200 }} cols={3} rowHeight={164}>
                                {exsitImages!.map((item) => (
                                    <ImageListItem key={item}>
                                        <img
                                            srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                            src={`${item}?w=164&h=164&fit=crop&auto=format`}
                                            alt={item}
                                            loading="lazy"
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        )}
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                    <Typography>Thumbnail</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box className="flex flex-wrap gap-6">
                        <Box className="flex-1">
                            <Box className="mt-1 flex gap-4 mb-2">
                                <Input onChange={handleChangeThumbnail} type="file" />
                                {file.preview.length > 0 && (
                                    <ButtonVariant
                                        type="button"
                                        handleClick={handleUploadThumbnailToClound}
                                        title="Tải lên"
                                    />
                                )}
                            </Box>
                            {file.preview.length > 0 && (
                                <img
                                    className="w-32 h-32"
                                    src={file.preview}
                                    alt=""
                                    onLoad={() => {
                                        URL.revokeObjectURL(file.preview);
                                    }}
                                />
                            )}

                            <Typography variant="h6" className="my-2">
                                Hoặc
                            </Typography>

                            <Input
                                value={thumbnail}
                                className="truncate"
                                placeholder="link"
                                onChange={(e) => setThumbnail(e.target.value)}
                                type="text"
                            />
                        </Box>

                        {exsitImages?.length! > 0 && (
                            <div className="">
                                <h2 className="mb-2 font-bold text-xl">Thumbnail đang có:</h2>
                                <img className="object-cover" src={exsitThumbnail} />
                            </div>
                        )}
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default AccordionUpload;
