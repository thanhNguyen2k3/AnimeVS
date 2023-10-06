import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import React, { FormEvent, MouseEventHandler, ReactNode } from 'react';

type Props = {
    isLoading?: boolean;
    type?: 'button' | 'submit' | 'reset' | undefined;
    title?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    className?: string;
    variant?: 'text' | 'outlined' | 'contained';
    link?: boolean;
    to?: string;
    icon?: boolean;
    children?: ReactNode;
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
    disabled?: boolean;
    handleSubmitForm?: (e: FormEvent) => Promise<any>;
};

const ButtonVariant = ({ isLoading, title, handleClick, link, to, icon, variant, ...props }: Props) => {
    return (
        <>
            {icon ? (
                <IconButton>{props.children}</IconButton>
            ) : icon && link ? (
                <IconButton>
                    <Link href={to!}>{props.children}</Link>
                </IconButton>
            ) : (
                <LoadingButton
                    onClick={handleClick}
                    variant={variant ? variant : 'outlined'}
                    loading={isLoading}
                    {...props}
                >
                    {link ? <Link href={to!}>{title}</Link> : title ? title : 'Submit'}
                </LoadingButton>
            )}
        </>
    );
};

export default ButtonVariant;
