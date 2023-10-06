'use client';

import { useField } from 'formik';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { FormEventHandler, ReactNode } from 'react';

type FieldProps = {
    name: string;
    label?: string;
    placeholder?: string;
    type?: string;
    selectDataArray?: boolean;
    childrenData?: any[];
    children?: ReactNode;
    selectOption?: boolean;
    checkbox?: boolean;
    childrenCustom?: boolean;
    changeEvent?: FormEventHandler<HTMLDivElement>;
};

const InputField = ({
    selectDataArray,
    selectOption,
    children,
    childrenData,
    checkbox,
    childrenCustom,
    ...props
}: FieldProps) => {
    const [fields, { error }] = useField(props);

    return (
        <>
            {selectDataArray ? (
                <FormControl sx={{ mt: 2 }} fullWidth>
                    <InputLabel>{props.label}</InputLabel>
                    <Select id={fields.name} {...fields} {...props} error={!!error}>
                        <MenuItem value={''}>-- {props.label} -- </MenuItem>
                        {childrenData?.map((children) => (
                            <MenuItem key={children.id} value={children.id}>
                                {children.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ) : selectOption ? (
                <TextField
                    sx={{ mt: 2 }}
                    fullWidth
                    id={fields.name}
                    {...props}
                    {...fields}
                    select
                    error={!!error}
                    helperText={error}
                >
                    <MenuItem selected value={''}>
                        -- {props.label} --
                    </MenuItem>
                    {childrenData?.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            ) : childrenCustom ? (
                <TextField
                    sx={{ mt: 2 }}
                    fullWidth
                    id={fields.name}
                    {...props}
                    {...fields}
                    select
                    error={!!error}
                    helperText={error}
                    defaultValue=""
                >
                    {children}
                </TextField>
            ) : (
                <TextField
                    fullWidth
                    error={!!error}
                    helperText={error}
                    id={fields.name}
                    {...fields}
                    {...props}
                    variant="outlined"
                    sx={{ mt: 2 }}
                />
            )}
        </>
    );
};

export default InputField;
