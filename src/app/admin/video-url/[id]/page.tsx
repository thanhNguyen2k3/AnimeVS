import FormUpdateMovieUrl from '@/components/admin/FormUpdateMovieUrl';
import { db } from '@/lib/db';
import { awaitLoading } from '@/utils/awaitLoading';

type Params = {
    params: {
        id: string;
    };
};

const page = async ({ params: { id } }: Params) => {
    await awaitLoading();

    const exsitingData = await db.movieUrl.findFirst({
        where: {
            id,
        },
        include: {
            MovieParent: true,
        },
    });

    const existingPlaylist = await db.moviePlaylist.findMany();

    return <FormUpdateMovieUrl existingData={exsitingData} playlistMovie={existingPlaylist} />;
};

export default page;
