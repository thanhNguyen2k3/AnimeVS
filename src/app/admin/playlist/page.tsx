import Playlist from '@/components/admin/Playlist';
import { db } from '@/lib/db';
import { awaitLoading } from '@/utils/awaitLoading';

const page = async () => {
    await awaitLoading();
    const data = await db.moviePlaylist.findMany({
        include: {
            movieUrls: true,
        },
    });

    return <Playlist data={data} />;
};

export default page;
