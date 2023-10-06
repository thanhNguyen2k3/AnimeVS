import TrashTable from '@/components/ui/TrashTable';
import { db } from '@/lib/db';
import { awaitLoading } from '@/utils/awaitLoading';

const page = async () => {
    await awaitLoading();

    const data = await db.movie.findMany({
        where: {
            deleted: true,
        },
    });

    return <TrashTable data={data} />;
};

export default page;
