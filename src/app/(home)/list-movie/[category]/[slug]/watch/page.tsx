import CommentSectionServer from '@/components/CommentSectionServer';
import WatchMovie from '@/components/page/WatchMovie';
import { db } from '@/lib/db';
import { awaitLoading } from '@/utils/awaitLoading';
import ReactPlayer from 'react-player';

type Params = {
    params: {
        category: string;
        slug: string;
    };
    searchParams: { [key: string]: string | string[] | undefined };
};

const page = async ({ params: { slug, category }, searchParams }: Params) => {
    await awaitLoading();

    const page = searchParams['ep'] ?? '1';

    const existingMovie = await db.movie.findUnique({
        where: {
            slug,
        },
        include: {
            comments: true,
            rating: true,
            moviePlaylist: {
                include: {
                    movieUrls: true,
                },
            },
        },
    });

    const existingUrls = await db.movieUrl.findFirst({
        where: {
            episode: page.toString(),
        },
    });

    return (
        <div className="lg:px-40 max-md:px-4">
            <WatchMovie data={existingMovie} existingUrls={existingUrls} />

            <CommentSectionServer movieId={existingMovie?.id!} />
        </div>
    );
};

export default page;
