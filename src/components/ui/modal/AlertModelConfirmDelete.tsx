import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Movie } from '@prisma/client';
import ButtonVariant from '../ButtonVariant';

type Props = {
    id: string;
    promise?: (id: string) => Promise<void>;
    movie?: Movie;
};

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AlertModelConfirmDelete = ({ promise, id, movie }: Props) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            <IconButton aria-label="delete" onClick={handleOpen}>
                <DeleteIcon />
            </IconButton>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Bạn có muốn xóa - <span className="text-red-500">{movie?.name}</span>
                    </Typography>
                    <Box id="modal-modal-description" sx={{ mt: 2, display: 'flex', float: 'right', gap: 2 }}>
                        <ButtonVariant
                            type="button"
                            variant="outlined"
                            handleClick={() => promise!(id)}
                            title="Thùng rác"
                            color="error"
                        />
                        <ButtonVariant
                            type="button"
                            variant="outlined"
                            handleClick={handleClose}
                            title="Hủy"
                            color="inherit"
                        />
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default AlertModelConfirmDelete;
