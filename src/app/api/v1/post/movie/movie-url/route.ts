import { db } from '@/lib/db';
import { getAuthSession } from '@/utils/auth';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const session = await getAuthSession();

    if (session?.user.isAdmin !== true) return new NextResponse('Unauthorized', { status: 401 });

    try {
        const { episode, url, movieParentId } = body;
        const movieUrl = await db.movieUrl.create({
            data: {
                episode,
                url,
                movieParentId,
            },
        });

        return new NextResponse(JSON.stringify(movieUrl), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 400 });
    }
};
