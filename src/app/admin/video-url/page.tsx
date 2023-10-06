import MovieUrlData from '@/components/admin/MovieUrlData';
import { db } from '@/lib/db';
import { awaitLoading } from '@/utils/awaitLoading';
import React from 'react';

const page = async () => {
    await awaitLoading();

    const data = await db.movieUrl.findMany({
        include: {
            MovieParent: true,
        },
    });

    return <MovieUrlData data={data} />;
};

export default page;
