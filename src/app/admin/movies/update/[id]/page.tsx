import FormUpdateMovie from '@/components/FormUpdateMovie';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import React from 'react';

type Params = {
    params: {
        id: string;
    };
};

const page = async ({ params: { id } }: Params) => {
    const existingMovie = await db.movie.findFirst({
        where: {
            id,
        },
    });

    const studio = await db.studio.findMany();
    const season = await db.season.findMany();
    const nation = await db.nation.findMany();
    const movieUrls = await db.movieUrl.findMany();
    const categories = await db.category.findMany();
    const moviePlaylist = await db.moviePlaylist.findMany({
        include: {
            movieUrls: true,
            _count: true,
        },
    });

    if (!id) return notFound();

    return (
        <FormUpdateMovie
            categories={categories}
            movie={existingMovie!}
            season={season}
            studio={studio}
            nation={nation}
            movieUrls={movieUrls}
            moviePlaylist={moviePlaylist}
        />
    );
};

export default page;
