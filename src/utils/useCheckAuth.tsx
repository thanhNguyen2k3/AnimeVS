'use client';

import { useMeQuery } from '@/lib/redux/services/comment';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useCheckAuth = () => {
    const pathName = usePathname();
    const router = useRouter();

    const { data, error, isLoading, isSuccess } = useMeQuery();

    useEffect(() => {
        if (!isLoading) {
            if (data && (pathName === '/auth/sign-in' || pathName === '/auth/sign-up')) {
                router.replace('/');
            } else if ((!data && pathName !== '/auth/sign-in') || pathName !== '/auth/sign-up') {
                return;
            }
        }
    }, [data, isLoading, router]);

    return {
        data,
        isLoading,
        isSuccess,
        error,
    };
};
