'use client';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import useMediaQuery from '@mui/material/useMediaQuery';
import Rating from '@mui/material/Rating';
import { useState } from 'react';
import Divider from '@mui/material/Divider';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import StarIcon from '@mui/icons-material/Star';
import { increaView } from '@/utils/api/increaView';
import { useRouter } from 'next/navigation';

type Props = {
    data: any;
};

const labels: { [index: string]: string } = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const DetailMovie = ({ data }: Props) => {
    const router = useRouter();

    const [value, setValue] = useState<number | null>(2);
    const [hover, setHover] = useState(-1);

    const onReduceViewsWhenClick = async () => {
        await increaView(data.id, data);

        router.push(`${data.slug}/watch?ep=1`);
    };

    return (
        <div className="relative">
            <div>
                <div
                    className="absolute z-10 bg-opacity-50 top-0 left-0 right-0 bottom-0 bg-center bg-cover "
                    style={{ backgroundImage: `url(${data?.images[0]})` }}
                ></div>

                <div className="flex px-4 py-6 gap-4 relative z-50 bg-black/70 flex-wrap justify-center">
                    <div className="relative cursor-pointer" onClick={onReduceViewsWhenClick}>
                        <div>
                            <img className="w-[180px] h-[260px] object-cover " src={data?.thumbnail!} alt="" />
                            <div className="absolute opacity-0 hover:opacity-100 flex items-center justify-center top-0 left-0 bottom-0 right-0 hover:bg-black/70 transition-all">
                                <div className="border w-12 h-12 flex items-center justify-center rounded-full border-white">
                                    <i>
                                        <PlayArrowIcon fontSize="large" />
                                    </i>
                                </div>
                            </div>
                            <div className="absolute uppercase text-black bottom-4 bg-primary/90 flex items-center justify-center w-full h-10">
                                Xem phim
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h1 className="capitalize text-3xl font-semibold">{data?.name}</h1>
                        <h4 className="text-gray-200 font-semibold text-base">{data?.subname}</h4>
                        <p className="text-gray-400 font-medium line-clamp-3 max-w-3xl whitespace-pre-wrap">
                            {data?.description}
                        </p>

                        <Divider className="bg-white/25" />
                        <div className="flex flex-wrap gap-2 items-center text-sm">
                            <div>
                                <i>
                                    <Rating
                                        name="hover-feedback"
                                        value={value}
                                        precision={0.5}
                                        getLabelText={getLabelText}
                                        onChange={(_event, newValue) => {
                                            setValue(newValue);
                                        }}
                                        onChangeActive={(_event, newHover) => {
                                            setHover(newHover);
                                        }}
                                        emptyIcon={
                                            <StarIcon style={{ opacity: 1, color: 'white' }} fontSize="inherit" />
                                        }
                                    />
                                </i>
                                <div>(Đánh giá từ - {data.followers.length} thành viên)</div>
                                <div>{value !== null && <p>{labels[hover !== -1 ? hover : value]}</p>}</div>
                            </div>

                            <div className="flex gap-2 text-gray-400">
                                <Divider className="bg-white/25 max-[460px]:hidden" orientation="vertical" flexItem />

                                <span className="flex gap-2 items-center">
                                    <i>
                                        <AccessTimeOutlinedIcon fontSize="small" />
                                    </i>
                                    {data.moviePlaylist.movieUrls?.length}/{data.episode}
                                </span>

                                <span className="flex gap-2 items-center">
                                    <i>
                                        <CalendarMonthIcon fontSize="small" />
                                    </i>
                                    {data.season.name}
                                </span>

                                <span className="flex gap-2 items-center">
                                    <i>
                                        <RemoveRedEyeIcon fontSize="small" />
                                    </i>
                                    {data.views} Lượt xem
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailMovie;
