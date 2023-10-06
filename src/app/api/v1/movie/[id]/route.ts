import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
    params: {
        id: string;
    };
};

export const PATCH = async (req: NextRequest, { params }: Params) => {
    const id = params.id;
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
        if (!id) return new NextResponse('Movie not found', { status: 400 });

        await db.movie.update({
            where: {
                id,
            },
            data: {
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
                deleted: true,
            },
        });

        return new NextResponse('Đã thêm vào thùng rác', { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 400 });
    }
};
