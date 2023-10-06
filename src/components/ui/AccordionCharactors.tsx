import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import ButtonVariant from './ButtonVariant';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
    characters: string[];
    setCharacters: Dispatch<SetStateAction<string[]>>;
};

const AccordionCharactors = ({ characters, setCharacters }: Props) => {
    const [nameCharacter, setNameCharacter] = useState<string>('');

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleCreateCharacter = () => {
        setCharacters((prev) => [...prev, nameCharacter]);
        setNameCharacter('');
        inputRef.current?.focus();
    };

    const handleRemoveCharacter = (index: number) => {
        setCharacters((prev) => [...prev.filter((_character, i) => i !== index)]);
    };

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>Nhân vật</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {characters.length > 0 && (
                    <List>
                        {characters.map((name, i) => (
                            <ListItem key={i} disablePadding>
                                <ListItemButton>
                                    <ListItemText primary={name} />
                                    <ListItemIcon>
                                        <DeleteIcon onClick={() => handleRemoveCharacter(i)} />
                                    </ListItemIcon>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                )}

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <input
                        value={nameCharacter}
                        onChange={(e) => setNameCharacter(e.target.value)}
                        placeholder="Tên nhân vật"
                        ref={inputRef}
                        className="outline-none px-2 py-2 border border-gray-300 rounded"
                    />
                    <ButtonVariant title="Thêm" handleClick={handleCreateCharacter} />
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export default AccordionCharactors;
