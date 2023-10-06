import AdminGridData from '@/components/ui/AdminGridData';
import { db } from '@/lib/db';
import { awaitLoading } from '@/utils/awaitLoading';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const page = async () => {
    await awaitLoading();

    const data = await db.movie.findMany({
        where: {
            deleted: false,
        },
        include: {
            category: true,
            nation: true,
            rating: true,
            season: true,
            studio: true,
            moviePlaylist: true,
            _count: true,
        },
    });

    return <AdminGridData data={data} />;
};

export default page;
