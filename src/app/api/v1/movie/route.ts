import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        const movies = await db.movie.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                _count: true,
                category: true,
                comments: true,
                followers: true,
                moviePlaylist: true,
                nation: true,
                rating: true,
                season: true,
                studio: true,
            },
        });

        if (movies.length === 0) {
            return new NextResponse("Movies not found or don't have movie", { status: 200 });
        }

        return new NextResponse(JSON.stringify(movies), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 500 });
    }
};
