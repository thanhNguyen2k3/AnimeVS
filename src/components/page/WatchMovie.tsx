'use client';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { MovieUrl } from '@prisma/client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import ReactPlayer from 'react-player';
import LoadingProgress from '../ui/loading/LoadingProgress';
import { useMediaQuery } from '@mui/material';

type PageProps = {
    data: any;
    existingUrls: MovieUrl | null;
};

function Crumb({ text, href, last = false }: { text: string; href: string; last: boolean }) {
    if (last) {
        return <Typography color="gray">{text}</Typography>;
    }

    return (
        <Link className="hover:underline text-sm" color="inherit" href={href}>
            {text}
        </Link>
    );
}

const WatchMovie = ({ data, existingUrls }: PageProps) => {
    const match = useMediaQuery('(min-width:600px)');

    const pathName = usePathname();
    const params = useSearchParams();

    const ep = params.get('ep');

    const breadcrumbs = useMemo(
        function generateBreadcrumbs() {
            const asPathWithoutQuery = pathName.split('?')[0];
            const asPathNestedRoutes = asPathWithoutQuery.split('/').filter((v) => v.length > 0);

            const crumblist = asPathNestedRoutes.map((subpath, idx) => {
                const href = '/' + asPathNestedRoutes.slice(0, idx + 1).join('/');
                return { href, text: subpath };
            });

            return [{ href: '/', text: 'Home' }, ...crumblist];
        },
        [pathName],
    );

    return (
        <div>
            <div>
                <Breadcrumbs component={'div'} aria-label="breadcrumb" className="text-gray-300 py-4">
                    {breadcrumbs.map((crumb, idx) => (
                        <Crumb {...crumb} key={idx} last={idx === breadcrumbs.length - 1} />
                    ))}
                </Breadcrumbs>
            </div>

            <div className="w-full">
                <ReactPlayer
                    playsinline={true}
                    url={existingUrls?.url}
                    width={'100%'}
                    height={match ? '400px' : '200px'}
                    fallback={
                        <div>
                            <LoadingProgress />
                        </div>
                    }
                    controls={true}
                    pip={true}
                />
            </div>

            <div className="w-full">
                <div className="px-2 py-2 bg-gray-800/40 my-6 rounded">
                    <h1 className="text-lg font-semibold  mb-2">Tập phim</h1>

                    <div className="flex gap-x-2">
                        {data.moviePlaylist.movieUrls.map((item: any) => (
                            <Link
                                key={item.id}
                                className={`${
                                    item.episode === ep ? 'bg-secondary' : ''
                                } flex justify-center bg-gray-900 hover:bg-secondary items-center px-4 rounded py-1`}
                                href={`watch?ep=${item.episode}`}
                            >
                                {item.episode}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WatchMovie;
