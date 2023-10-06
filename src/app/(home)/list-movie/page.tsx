import Wrapper from '@/components/componentsChildren/Wrapper';
import Paginated from '@/components/ui/Paginated';
import { db } from '@/lib/db';
import { awaitLoading } from '@/utils/awaitLoading';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

type Props = {
    searchParams: { [key: string]: string | string[] | undefined };
};

const PER_PAGE = 5;

const page = async ({ searchParams }: Props) => {
    const page = searchParams['page'] ?? '1';

    const currentPage = Math.max(Number(page), 1);
    const count = await db.movie.count();

    const data = await db.movie.findMany({
        where: {
            deleted: false,
        },
        orderBy: {
            createdAt: 'asc',
        },
        skip: (currentPage - 1) * PER_PAGE,
        take: PER_PAGE,
        include: {
            category: true,
            season: true,
            studio: true,
            _count: true,
        },
    });

    return (
        <Wrapper>
            <div className="grid grid-cols-5 max-[820px]:grid-cols-3 max-[920px]:grid-cols-4 max-[800px]:grid-cols-3 max-sm:grid-cols-2 gap-6 overflow-hidden">
                {data.map((item) => (
                    <a
                        href={`/list-movie/${item.category?.slug}/${item.slug}`}
                        className="flex transition-all relative font-poppins after:absolute items-center after:right-0"
                    >
                        <img className="h-full w-full object-cover" src={item?.thumbnail!} />
                        <div className="absolute p-4  bg-black/40 h-16 left-0 bottom-0 right-0">
                            <h3 className="truncate capitalize">{item.name}</h3>
                        </div>
                        <div className="hover:opacity-100 overflow-hidden space-y-2 p-4 opacity-0 absolute top-0 left-0 bottom-0 right-0 transition-all bg-black/75 ">
                            <h3>{item.name}</h3>
                            <p className="text-gray-400">Views: {item.views}</p>
                            <p className="text-gray-400">Season: {item?.season?.name}</p>
                            <p className="text-gray-400">Studio: {item?.studio?.name}</p>
                            <p>{item.description.slice(0, 260)}...</p>
                        </div>
                    </a>
                ))}
            </div>
            <Paginated count={Math.ceil(count / PER_PAGE)} />
        </Wrapper>
    );
};

export default page;
