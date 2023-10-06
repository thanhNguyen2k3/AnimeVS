'use client';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import { MovieUrl } from '@prisma/client';
import { ReactNode, SyntheticEvent, useState } from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import useMediaQuery from '@mui/material/useMediaQuery';
import FeedIcon from '@mui/icons-material/Feed';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import ReactPlayer from 'react-player';
import Link from 'next/link';
import LoadingCircular from '../ui/loading/LoadingCircular';
import { OnProgressProps } from 'react-player/base';

type Props = {
    data: any | null;
};

interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <div className="p-4">{children}</div>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ListItem = ({
    title,
    children,
    link,
    to,
}: {
    title: string;
    children: ReactNode;
    link?: boolean;
    to?: string;
}) => {
    return (
        <li className="flex grap-2">
            <i>
                <ArrowRightIcon className="text-secondary" />
            </i>
            {title}
            <div className="text-gray-300 ml-2 line-clamp-1">
                {link ? (
                    <Link className="text-secondary" href={to!}>
                        {children}
                    </Link>
                ) : (
                    children
                )}
            </div>
        </li>
    );
};

const TabControl = ({ data }: Props) => {
    const matches = useMediaQuery('(max-width: 768px)');

    const [value, setValue] = useState<number>(0);

    const handleChange = (_event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className="w-[826px] max-w-full">
            <Box sx={{ maxWidth: { xs: 320, sm: 480 }, borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    textColor="inherit"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab label={matches ? <FeedIcon /> : 'Thông tin phim'} className="line-clamp-1" {...a11yProps(0)} />
                    <Tab
                        label={matches ? <MovieFilterIcon /> : 'Nhân vật'}
                        className="line-clamp-1"
                        {...a11yProps(1)}
                    />
                    <Tab
                        label={matches ? <OndemandVideoIcon /> : 'Trailer'}
                        className="line-clamp-1"
                        {...a11yProps(2)}
                    />
                    <Tab
                        label={matches ? <PhotoSizeSelectActualIcon /> : 'Hình ảnh'}
                        className="line-clamp-1"
                        {...a11yProps(3)}
                    />
                </Tabs>
            </Box>
            <div className="bg-[#333]">
                <CustomTabPanel value={value} index={0}>
                    <ul className="text-sm font-semibold grid grid-cols-2">
                        <li>
                            <ul>
                                <li className="flex">
                                    <i>
                                        <ArrowRightIcon className="text-secondary" />
                                    </i>
                                    Tập mới:
                                    <div className="space-x-1 ml-2">
                                        {data.moviePlaylist.movieUrls
                                            .slice(-2)
                                            .reverse()
                                            .map((item: MovieUrl) => (
                                                <Link
                                                    key={item.id}
                                                    href={`${data.slug}/watch?ep=${item.episode}`}
                                                    className="cursor-pointer hover:bg-secondary px-2 py-1 bg-gray-500"
                                                >
                                                    {item.episode}
                                                </Link>
                                            ))}
                                    </div>
                                </li>
                                {data.showtime.length === 0 ? null : (
                                    <ListItem title="Lịch chiếu:" children={data.showtime} />
                                )}
                                <ListItem
                                    title="Thể loại:"
                                    children={data.category.name}
                                    link
                                    to={`/list-movie/${data.category.slug}`}
                                />
                                <ListItem title="Đạo diễn:" children={data.director} />
                                <ListItem title="Quốc gia:" children={data.nation.name} link to="/" />
                            </ul>
                        </li>

                        <li>
                            <ul>
                                <ListItem title="Số người theo dõi:" children={data.followers.length} />
                                <ListItem
                                    title="Thời lượng:"
                                    children={`${data.moviePlaylist.movieUrls.length}/${data.episode}`}
                                />
                                <ListItem
                                    title="Chất lượng:"
                                    children={
                                        <div className="px-1 rounded-full text-center bg-secondary w-9">
                                            {data.quality}
                                        </div>
                                    }
                                />
                                <ListItem title="Studio:" children={data.studio.name} link to="/" />
                                <ListItem title="Season:" children={data.season.name} link to="/" />
                            </ul>
                        </li>
                    </ul>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <div className="flex flex-wrap gap-6">
                        {data.characters.map((char: string, i: number) => (
                            <div key={i} className="flex flex-col items-center w-28">
                                <Avatar sx={{ width: 86, height: 86 }}>
                                    <AccountCircleIcon className="w-full h-full" />
                                </Avatar>
                                <p className="font-semibold text-center">{char}</p>
                            </div>
                        ))}
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <ReactPlayer
                        fallback={<LoadingCircular />}
                        controls={true}
                        url={`https://streamable.com/jwbkn1`}
                        width={'100%'}
                        previewTabIndex={0}
                    />
                </CustomTabPanel>

                <CustomTabPanel value={value} index={3}>
                    <img className="max-h-[600px] object-cover w-full h-full" src={data.images[0]} alt="" />
                </CustomTabPanel>
            </div>
        </div>
    );
};

export default TabControl;
