import Wrapper from '@/components/componentsChildren/Wrapper';
import Paginated from '@/components/ui/Paginated';
import { db } from '@/lib/db';
import Link from 'next/link';

type DynamicParams = {
    params: {
        category: string;
    };
    searchParams: { [key: string]: string | string[] | undefined };
};

const PER_PAGE = 5;

const page = async ({ params: { category }, searchParams }: DynamicParams) => {
    const page = searchParams['page'] ?? '1';

    const currentPage = Math.max(Number(page), 1);
    const count = await db.movie.count();

    const existingMovieByCategory = await db.movie.findMany({
        where: {
            category: {
                slug: category,
            },
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
                {existingMovieByCategory.map((item: any) => (
                    <Link
                        key={item.id}
                        href={`/list-movie/${item.category.slug}/${item.slug}`}
                        className="flex transition-all relative font-poppins after:absolute items-center after:right-0"
                    >
                        <img className="h-full w-full object-cover" src={item?.thumbnail!} alt="" />
                        <div className="absolute p-4  bg-black/40 h-16 left-0 bottom-0 right-0">
                            <h3 className="truncate capitalize">{item.name}</h3>
                        </div>
                        <div className="hover:opacity-100 overflow-hidden space-y-2 p-4 opacity-0 absolute top-0 left-0 bottom-0 right-0 transition-all bg-black/75 ">
                            <h3>{item.name}</h3>
                            <p className="text-gray-400">Views: {item.views}</p>
                            <p className="text-gray-400">Season: {item.season?.name}</p>
                            <p className="text-gray-400">Studio: {item.studio?.name}</p>
                            <p>{item.description.slice(0, 260)}...</p>
                        </div>
                    </Link>
                ))}
            </div>
            {existingMovieByCategory.length === 0 ? (
                <div className="flex justify-center items-center space-y-4 flex-col my-40 px-12">
                    <img src="https://www.crunchyroll.com/build/assets/img/home/yuzu.png" alt="" />

                    <h1>Không tìm thấy video nào</h1>

                    <button className="border-[4px] hover:border-primary/90 hover:text-primary/90 border-primary px-6 py-2 text-lg font-semibold text-primary ">
                        <Link href="/list-movie">VIEW ALL</Link>
                    </button>
                </div>
            ) : (
                <Paginated count={Math.ceil(count / PER_PAGE)} />
            )}
        </Wrapper>
    );
};

export default page;
