import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const middleware = async (req: NextRequest) => {
    const token = await getToken({ req });

    if (token?.isAdmin !== true) {
        return NextResponse.redirect(new URL('/notfound', req.nextUrl));
    }
};

export const config = {
    matcher: ['/admin/:path*', '/api/v1/:path*'],
};
