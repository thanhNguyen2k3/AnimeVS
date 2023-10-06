import Heading from '@/components/componentsChildren/Heading';
import Wrapper from '@/components/componentsChildren/Wrapper';
import ListMovie from '@/components/page/ListMovie';
import NewEpisode from '@/components/page/NewEpisode';
import CarouselUi from '@/components/ui/CarouselUi';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import { db } from '@/lib/db';
import BlogList from '@/components/page/BlogList';
import Link from 'next/link';

import { awaitLoading } from '@/utils/awaitLoading';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const getData = async () => {
    const data = await db.movie.findMany({
        where: {
            deleted: false,
        },
        take: 6,
        include: {
            category: true,
            studio: true,
            season: true,
            rating: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return { data };
};

const getPoppular = async () => {
    const dataPopular = await db.movie.findMany({
        where: {
            deleted: false,
        },
        take: 6,
        include: {
            category: true,
            studio: true,
            season: true,
            rating: true,
        },
        orderBy: {
            views: 'desc',
        },
    });
    return {
        dataPopular,
    };
};

const page = async () => {
    await awaitLoading();

    const { data } = await getData();
    const { dataPopular } = await getPoppular();

    return (
        <div className="flex flex-col relative z-50 ">
            <CarouselUi />

            <div>
                <Heading childrenIcon={<GradeOutlinedIcon color="primary" />} title="Tập Mới" />

                <Wrapper>
                    <NewEpisode />
                    <NewEpisode />
                    <NewEpisode />

                    <button className="w-full bg-secondary/30 hover:bg-secondary/50 px-2 py-2 mt-12">
                        XEM LỊCH PHÁT HÀNH
                    </button>
                </Wrapper>
                <Heading title="Anime nổi bật mùa này" />

                <Wrapper>
                    <ListMovie selectItem={4} data={data} />
                </Wrapper>
                <div>
                    <Heading childrenIcon={<FeedbackOutlinedIcon color="primary" />} title="Tin Tức" />

                    <div className="py-4 bg-gradient-to-r from-primary to-primary">
                        <Wrapper>
                            <BlogList />
                        </Wrapper>
                    </div>
                </div>

                <div>
                    <Wrapper>
                        <div className="my-6">
                            <a href="">
                                <img
                                    className="w-full object-cover"
                                    src="https://static.crunchyroll.com/fms/desktop_large/1050x350/652495e7-3d72-463f-8551-1a944f30f060.png"
                                    alt=""
                                />
                            </a>
                        </div>
                    </Wrapper>
                </div>

                <div>
                    <Heading childrenIcon={<AutoFixHighOutlinedIcon color="primary" />} title="Phổ biến nhất" />

                    <Wrapper>
                        <ListMovie selectItem={4} data={dataPopular} />
                    </Wrapper>
                </div>

                <div className="flex justify-center items-center space-y-4 flex-col my-40 px-12">
                    <img src="https://www.crunchyroll.com/build/assets/img/home/yuzu.png" alt="" />

                    <h1>Bạn vẫn đang tìm thứ gì đó để xem? Kiểm tra thư viện đầy đủ của chúng tôi</h1>

                    <button className="border-[4px] hover:border-primary/90 hover:text-primary/90 border-primary px-6 py-2 text-lg font-semibold text-primary ">
                        <Link href="/list-movie">VIEW ALL</Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default page;
