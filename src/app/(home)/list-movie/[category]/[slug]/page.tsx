import CommentSectionServer from '@/components/CommentSectionServer';
import TabControl from '@/components/componentsChildren/TabControl';
import DetailMovie from '@/components/page/DetailMovie';
import { db } from '@/lib/db';
import React from 'react';

type Props = {
    params: {
        slug: string;
    };
};

const page = async ({ params: { slug } }: Props) => {
    const existingMovie = await db.movie.findUnique({
        where: {
            slug,
        },
        include: {
            category: true,
            season: true,
            studio: true,
            comments: true,
            followers: true,
            nation: true,
            rating: true,
            moviePlaylist: {
                include: {
                    movieUrls: true,
                },
            },
        },
    });

    return (
        <div>
            <DetailMovie data={existingMovie} />

            <div className="flex items-center flex-col">
                <TabControl data={existingMovie} />
            </div>

            <div>
                <CommentSectionServer movieId={existingMovie!.id} />
            </div>
        </div>
    );
};

export default page;
