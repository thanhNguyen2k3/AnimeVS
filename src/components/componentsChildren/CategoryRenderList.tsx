'use server';

import { db } from '@/lib/db';

const CategoryRenderList = async () => {
    const categories = await db.category.findMany();

    return (
        <div className="grid grid-cols-4">
            {categories.map((category) => (
                <p>{category.name}</p>
            ))}
        </div>
    );
};

export default CategoryRenderList;
