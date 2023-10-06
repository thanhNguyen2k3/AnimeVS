import FormUpdatePlaylist from '@/components/admin/FormUpdatePlaylist';
import { db } from '@/lib/db';
import { awaitLoading } from '@/utils/awaitLoading';

type Params = {
    params: {
        id: string;
    };
};

const page = async ({ params: { id } }: Params) => {
    await awaitLoading();

    const existingPlaylist = await db.moviePlaylist.findFirst({
        where: {
            id,
        },
    });

    return <FormUpdatePlaylist existingData={existingPlaylist} />;
};

export default page;
