import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Category } from '@prisma/client';
import { SyntheticEvent } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';

type Props = {
    categories: Category[];
    handleEvent: (e: SyntheticEvent, category: Category) => void;
};

const AccordionCategory = ({ categories, handleEvent }: Props) => {
    return (
        <Accordion sx={{ mt: 2, mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="categories">
                <Typography>Thể loại</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FormGroup>
                    {categories.map((cate) => (
                        <FormControlLabel
                            key={cate.id}
                            onChange={(e) => handleEvent(e, cate)}
                            control={<Checkbox />}
                            label={cate.name}
                        />
                    ))}
                </FormGroup>
            </AccordionDetails>
        </Accordion>
    );
};

export default AccordionCategory;
