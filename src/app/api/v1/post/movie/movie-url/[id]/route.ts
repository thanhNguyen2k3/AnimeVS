import { db } from '@/lib/db';
import { getAuthSession } from '@/utils/auth';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
    params: {
        id: string;
    };
};

export const PATCH = async (req: NextRequest, { params: { id } }: Params) => {
    const session = await getAuthSession();

    if (session?.user.isAdmin !== true) return new NextResponse('Unauthorized', { status: 401 });

    if (!id) return new NextResponse('Url not found');

    try {
        const body = await req.json();

        const { episode, movieParentId, url } = body;

        const existingUrl = await db.movieUrl.update({
            where: {
                id,
            },
            data: {
                episode,
                movieParentId,
                url,
            },
        });

        return new NextResponse(JSON.stringify(existingUrl), { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error });
    }
};
