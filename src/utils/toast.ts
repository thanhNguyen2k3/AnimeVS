import { toast } from 'react-toastify';

export const toastSuccessResponse = (message: string) => {
    return toast.success(message, {
        position: 'bottom-right',
    });
};

export const toastErrorResponse = (message: string) => {
    return toast.error(message, {
        position: 'bottom-right',
    });
};
