import FormUpdateCategory from '@/components/admin/FormUpdateCategory';
import { db } from '@/lib/db';

type Params = {
    params: {
        id: string;
    };
};

const page = async ({ params: { id } }: Params) => {
    const existingCategory = await db.category.findFirst({
        where: {
            id,
        },
    });

    return <FormUpdateCategory existingCategory={existingCategory!} />;
};

export default page;
