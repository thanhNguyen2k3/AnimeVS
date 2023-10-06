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

    if (!id) return new NextResponse('Playlist not found');

    try {
        const body = await req.json();

        const { playlistName, trailer } = body;

        const existingPlaylist = await db.moviePlaylist.update({
            where: {
                id,
            },
            data: {
                playlistName,
                trailer,
            },
        });

        return new NextResponse(JSON.stringify(existingPlaylist), { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error });
    }
};
