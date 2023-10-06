'use client';

import { Movie } from '@prisma/client';
import Slider, { Settings } from 'react-slick';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';

type Props = {
    data: Movie[];
    selectItem?: number;
};

function SampleNextArrow(props: any) {
    const { onClick } = props;
    return (
        <div
            className="absolute opacity-10 hover:opacity-100 transition-all hover:overflow-visible z-10 bg-gradient-to-r from-black/30 flex items-center w-12 top-0 left-0 bottom-0"
            onClick={onClick}
        >
            <ArrowBackIosNewOutlinedIcon fontSize="large" className="opacity-50" />
        </div>
    );
}

function SamplePrevArrow(props: any) {
    const { onClick } = props;
    return (
        <div
            className="absolute opacity-10 hover:opacity-100 transition-all hover:overflow-visible z-10 bg-gradient-to-l from-black/30 flex items-center top-0 right-0 bottom-0"
            onClick={onClick}
        >
            <i>
                <ArrowForwardIosOutlinedIcon fontSize="large" className="opacity-50" />
            </i>
        </div>
    );
}

const ListMovie = ({ data, selectItem }: Props) => {
    const matches = useMediaQuery('(max-width: 768px)');

    const settings: Settings = {
        infinite: true,
        slidesToShow: matches ? 2 : selectItem,
        slidesToScroll: matches ? 2 : 3,
        speed: 500,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <Slider {...settings}>
            {data.map((item: any) => (
                <Link
                    key={item.id}
                    href={`/list-movie/${item?.category?.slug}/${item.slug}`}
                    className="flex transition-all relative font-poppins after:absolute items-center after:right-0"
                >
                    <img className="h-[400px] max-md:h-[260px] w-full object-cover" src={item?.thumbnail!} />
                    <div className="absolute p-4  bg-black/40 h-16 left-0 bottom-0 right-0">
                        <h3 className="truncate capitalize">{item.name}</h3>
                    </div>
                    <div className="hover:opacity-100 space-y-2 p-4 opacity-0 absolute top-0 left-0 bottom-0 right-0 transition-all bg-black/75 ">
                        <h3>{item.name}</h3>
                        <p className="text-gray-400">Views: {item.views}</p>
                        <p className="text-gray-400">Season: {item.season?.name}</p>
                        <p className="text-gray-400">Studio: {item.studio?.name}</p>
                        <p>{item.description.slice(0, 260)}...</p>
                    </div>
                </Link>
            ))}
        </Slider>
    );
};

export default ListMovie;
