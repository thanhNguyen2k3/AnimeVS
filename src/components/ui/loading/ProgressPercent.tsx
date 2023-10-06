import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

type Props = {
    progress?: number;
};

const ProgressPercent = ({ progress }: Props) => {
    return (
        <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress variant="determinate" color={progress === 100 ? 'secondary' : 'inherit'} value={progress} />
        </Box>
    );
};

export default ProgressPercent;
