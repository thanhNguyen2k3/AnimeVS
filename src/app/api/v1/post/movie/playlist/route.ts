import { db } from '@/lib/db';
import { getAuthSession } from '@/utils/auth';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const session = await getAuthSession();

    const { playlistName, trailer } = body;

    try {
        if (session?.user.isAdmin !== true) return new NextResponse('Unauthorized', { status: 401 });
        const playlist = await db.moviePlaylist.create({
            data: {
                trailer,
                playlistName,
            },
        });

        return new NextResponse(JSON.stringify(playlist), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 400 });
    }
};
