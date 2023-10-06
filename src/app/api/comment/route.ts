import { db } from '@/lib/db';
import { getAuthSession } from '@/utils/auth';
import { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const PATCH = async (req: NextRequest) => {
    try {
        const body = await req.json();

        const session = await getAuthSession();
        const { movieId, text, replyToId } = body;

        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        await db.comment.create({
            data: {
                text,
                movieId,
                replyToId,
                userId: session.user.id,
            },
        });

        return new NextResponse('OK');
    } catch (error) {
        return new NextResponse(JSON.stringify((error as AxiosError).message), { status: 500 });
    }
};

export const GET = async () => {
    try {
        const comments = await db.comment.findMany({
            include: {
                user: true,
                replies: true,
                replyTo: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        if (comments.length === 0) {
            return new NextResponse('Comment not found', { status: 200 });
        }

        return new NextResponse(JSON.stringify(comments));
    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 500 });
    }
};
