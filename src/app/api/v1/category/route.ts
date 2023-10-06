import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    const body = await req.json();

    const { name } = body;

    try {
        const newCategory = await db.category.create({
            data: {
                name,
            },
        });

        return new NextResponse(JSON.stringify(newCategory));
    } catch (error) {
        return new NextResponse(JSON.stringify(error));
    }
};
