import AdminLayout from '@/components/layouts/AdminLayout';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const layout = (props: Props) => {
    return <AdminLayout>{props.children}</AdminLayout>;
};

export default layout;
