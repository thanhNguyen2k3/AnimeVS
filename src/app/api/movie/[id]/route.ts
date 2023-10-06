import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

type Params = {
    params: {
        id: string
    }
}

// Increase Views

export const PATCH = async (req: NextRequest, { params: { id } }: Params) => {

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
        views
    } = body;

    try {
        await db.movie.update({
            where: {
                id,
            },
            data: {
                views: views + 1,
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
            }
        });

        return new NextResponse('Ok', { status: 200 });

    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 400 })
    }

} 