'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { setupStore } from '@/lib/redux/store';
import { SkeletonTheme } from 'react-loading-skeleton';

type Props = {
    children: ReactNode;
};

const store = setupStore();

const Providers = ({ children }: Props) => {
    return (
        <SessionProvider>
            <Provider store={store}>
                <SkeletonTheme baseColor="#202020" highlightColor="#444">
                    <ToastContainer />
                    {children}
                </SkeletonTheme>
            </Provider>
        </SessionProvider>
    );
};

export default Providers;
