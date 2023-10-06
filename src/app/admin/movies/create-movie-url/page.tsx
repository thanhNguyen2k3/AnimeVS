import FormCreateUrlMovie from '@/components/FormCreateMovieUrl';
import { db } from '@/lib/db';

const page = async () => {
    const playlistMovie = await db.moviePlaylist.findMany();

    return <FormCreateUrlMovie playlistMovie={playlistMovie} />;
};

export default page;
