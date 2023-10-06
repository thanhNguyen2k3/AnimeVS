import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { MoviePlaylist, MovieUrl } from '@prisma/client';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { MovieInput } from '@/types/MovieInput';
import { UseFormRegister } from 'react-hook-form';

type Props = {
    moviePlaylist: MoviePlaylist[];
    movieUrls: MovieUrl[];
    register: UseFormRegister<MovieInput>;
    existPl?: string;
};

const AccordionPlaylist = ({ moviePlaylist, movieUrls, register, existPl }: Props) => {
    const [open, setOpen] = useState(false);
    const [namePl, setNamePl] = useState<string | undefined | null>('');
    const [urls, setUrls] = useState<MovieUrl[]>([]);

    const viewChange = (value: string) => {
        const pl = moviePlaylist.find((prev) => {
            if (prev.id === value) {
                return prev.playlistName;
            }
        });

        const urls = movieUrls.filter((prev) => prev.movieParentId === value);

        setUrls(urls);
        setNamePl(pl?.playlistName);
    };

    const handleChangePlaylist = (e: SelectChangeEvent) => {
        viewChange(e.target.value);
    };

    useEffect(() => {
        viewChange(existPl!);
    }, []);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>Chọn danh sách phát Video</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Chọn Playlist</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            {...register('movieParentId')}
                            name="movieParentId"
                            onChange={(e) => handleChangePlaylist(e)}
                            defaultValue={existPl || ''}
                            label="Chọn Playlist"
                        >
                            <MenuItem value="">-- Chọn --</MenuItem>

                            {moviePlaylist.map((playlist) => (
                                <MenuItem key={playlist.id} value={`${playlist.id}`}>
                                    {playlist.playlistName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {urls.length > 0 ? (
                        <Box>
                            <List>
                                <ListItemButton onClick={handleClick}>
                                    <ListItemIcon>
                                        <FolderIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={namePl} />
                                    {open ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                {urls.map((playlist) => (
                                    <Collapse key={playlist.id} in={open} timeout="auto" unmountOnExit>
                                        <ListItem sx={{ overflow: 'hidden' }}>
                                            <List component="div" disablePadding>
                                                <ListItemButton sx={{ pl: 4 }}>
                                                    <ListItemIcon>
                                                        <FolderIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={`${namePl} - Tập ${playlist.episode}`} />
                                                </ListItemButton>
                                            </List>
                                        </ListItem>
                                    </Collapse>
                                ))}
                            </List>
                        </Box>
                    ) : (
                        <Typography className="text-red-500 mt-2">Chưa có dữ liệu</Typography>
                    )}
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export default AccordionPlaylist;
