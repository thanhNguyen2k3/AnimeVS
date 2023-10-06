import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
    params: {
        id: string;
    };
};

export const PATCH = async (req: NextRequest, { params: { id } }: Params) => {
    const body = await req.json();

    const { name } = body;

    try {
        const newCategory = await db.category.update({
            where: {
                id,
            },
            data: {
                name,
            },
        });

        return new NextResponse(JSON.stringify(newCategory));
    } catch (error) {
        return new NextResponse(JSON.stringify(error));
    }
};
