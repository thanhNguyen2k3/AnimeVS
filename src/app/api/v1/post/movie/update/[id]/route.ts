import { db } from '@/lib/db';
import { getAuthSession } from '@/utils/auth';
import { NextRequest, NextResponse } from 'next/server';

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const session = await getAuthSession();

    const body = await req.json();

    const {
        name,
        subname,
        description,
        director,
        showtime,
        episode,
        quality,
        studioId,
        characters,
        thumbnail,
        seasonId,
        nationId,
        movieParentId,
        categoryId,
        images,
    } = body;

    try {
        const id = params.id;

        if (session?.user.isAdmin !== true) return new NextResponse('Unauthorized', { status: 401 });

        if (!id) return new NextResponse('Movie not found', { status: 400 });

        const newMovie = await db.movie.update({
            where: {
                id,
            },
            data: {
                name,
                subname,
                description,
                quality,
                showtime,
                episode,
                director,
                characters,
                thumbnail,
                images,
                seasonId,
                nationId,
                studioId,
                movieParentId,
                categoryId,
            },
        });

        return new NextResponse(JSON.stringify(newMovie), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 400 });
    }
};
