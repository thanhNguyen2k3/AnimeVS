import { MovieInput } from '@/types/MovieInput';
import TextField from '@mui/material/TextField';
import { UseFormRegister } from 'react-hook-form';

type Props = {
    register?: UseFormRegister<MovieInput>;
};

const FormField = () => {
    return <TextField variant="outlined" />;
};

export default FormField;
