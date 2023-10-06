import CategoryRenderData from '@/components/admin/CategoryRenderData';
import { db } from '@/lib/db';

const page = async () => {
    const categories = await db.category.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });

    return <CategoryRenderData data={categories} />;
};

export default page;
