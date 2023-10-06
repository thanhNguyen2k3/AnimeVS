import FormCreateMovie from '@/components/FormCreateMovie';
import { db } from '@/lib/db';

const page = async () => {
    const studio = await db.studio.findMany();
    const season = await db.season.findMany({
        orderBy: {
            name: 'desc',
        },
    });
    const category = await db.category.findMany();
    const nation = await db.nation.findMany();
    const movieUrls = await db.movieUrl.findMany();
    const moviePlaylist = await db.moviePlaylist.findMany({
        include: {
            movieUrls: true,
            _count: true,
        },
    });

    return (
        <FormCreateMovie
            studio={studio}
            season={season}
            categories={category}
            nation={nation}
            moviePlaylist={moviePlaylist}
            movieUrls={movieUrls}
        />
    );
};

export default page;
