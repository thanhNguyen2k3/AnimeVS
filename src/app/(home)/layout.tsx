import Footer from '@/components/page/Footer';
import Navbar from '@/components/ui/Navbar';
import { db } from '@/lib/db';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const layout = async ({ children }: Props) => {
    const categories = await db.category.findMany();

    return (
        <div className="relative">
            <Navbar categories={categories} />
            <div className="z-0 absolute top-0 bottom-0 left-0 right-0 object-cover bg-gradient-to-b from-black to-black" />

            <div className="z-50 relative min-h-[1000px]">{children}</div>

            <Footer />
        </div>
    );
};

export default layout;
