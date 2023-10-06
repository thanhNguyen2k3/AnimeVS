import { db } from '@/lib/db';
import { getAuthSession } from '@/utils/auth';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
    const session = await getAuthSession();

    try {
        const body = await req.json();

        const {
            name,
            description,
            categoryId,
            director,
            quality,
            subname,
            characters,
            episode,
            images,
            thumbnail,
            showtime,
            status,
            seasonId,
            nationId,
            studioId,
            movieParentId,
        } = body;

        if (session?.user.isAdmin !== true) return new NextResponse('Unauthorized', { status: 401 });

        const movie = await db.movie.create({
            data: {
                name,
                subname,
                description,
                director,
                quality,
                showtime,
                status,
                categoryId,
                characters,
                episode,
                images,
                thumbnail,
                studioId,
                nationId,
                seasonId,
                movieParentId,
            },
        });

        return new NextResponse(JSON.stringify(movie), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 400 });
    }
};
