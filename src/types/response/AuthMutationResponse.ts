import { User } from '@prisma/client';

export type AuthMutationResponse = {
    code: number;
    success: boolean;
    message?: string;
    user?: User;
    error?: FieldErrors[];
};

export type FieldErrors = {
    field: string;
    message: string;
};
