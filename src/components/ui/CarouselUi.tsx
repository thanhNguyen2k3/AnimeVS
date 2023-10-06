'use client';

import Slider, { Settings } from 'react-slick';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import Tooltip from '@mui/material/Tooltip';

const items = [
    {
        name: 'Zom 100: Zombie ni Naru made ni Shitai 100 no Koto',
        description:
            'Sau 3 năm làm việc cho một công ty đen, Akira đã kiệt quệ cả về thể chất lẫn tinh thần. Nhưng một buổi sáng nọ, những gì anh thấy trên đường đi làm là một đống Zombies?! Akira sẽ sống cuộc sống của mình như thế nào trong một thế giới đã hoàn toàn thay đổi chỉ sau một đêm đây!?',
        url: 'https://static1.dualshockersimages.com/wordpress/wp-content/uploads/2023/01/zom-100-banner.jpg',
    },
    {
        name: 'Bungou Stray Dogs',
        description:
            'Nakajima Atsushi bị tống cổ ra khỏi trại trẻ mồ coi, đang trên bờ vực của cái chết khi thì quyết định đi cướp để tự cứu sự sống của mình nhưng cậu đã vướng vào rắc rối khi cứu đc thánh cuồng tự tử -Dazai Osamu, để rồi biết anh ta và cộng sự của anh ta là Kunikida là thành viên của một tổ chức "đặc nhiệm thám tử". Họ là những người sở hữu năng lực vượt ngoài tầm của nhân loại. Yêu cầu mà họ đang thực hiện là tìm kiếm một con hổ. Và theo cậu tiết lộ thì hình như nó đang cố truy lùng mạng sống của cậu từ đó cậu được hai nhà "đặc nhiệm thám tử" hối lộ để trở thành một mồi câu để dụ con hổ xuất hiện...',
        url: 'https://staticg.sportskeeda.com/editor/2022/08/c2676-16597956849984.png',
    },
    {
        name: 'Attack on Titan',
        description:
            'Eren Jaeger sống trong một thành phố bao bọc bởi tường đá. Titan giết người ở ngoài đó. Trong nhiều thập kỉ, thành viên của Nhóm trinh thám Legion là những con người duy nhất dám bước ra khỏi bức tường và thu thập thông tin về những Titan. Eren, một người yêu hòa bình, không còn nguyện vọng nào to lớn việc gia nhập họ.',
        url: 'https://i.ebayimg.com/images/g/K6kAAOSwCNBiCNWO/s-l1600.jpg',
    },
    {
        name: "JoJo's Bizarre Adventure: Steel Ball Run",
        description:
            'Câu chuyện của Stardust Crusaders bắt đầu tại nhà tù, nơi mà nhân vật chính là Kujo Jotaro (17 tuổi) - một tên đầu gấu chính hiệu - đang tự giam lỏng mình để khống chế một thế lực siêu nhiên mới vừa được thức tỉnh trong cậu - Stand. Để cứu lấy người mẹ đang dần bị đẩy tới bờ vực của cái chết, Jotaro phải thuần phục thứ sức mạnh không tưởng ấy và cùng với các chiến hữu lên đường tiêu diệt tận gốc tên ma ca rồng vừa trỗi dậy từ dưới đáy đại dương, cùng lòng căm thù dòng họ Jojo tới tận xương tận tủy - Dio.',
        url: 'https://i.pinimg.com/originals/7a/0b/72/7a0b7282169da87315fe42bcf59d1fbb.jpg',
    },
];

const CarouselUi = () => {
    function SampleNextArrow(props: any) {
        const { onClick } = props;
        return (
            <div
                className="absolute opacity-10 hover:opacity-100 transition-all hover:overflow-visible z-10 bg-gradient-to-r from-black/30 flex items-center w-12 top-0 left-0 bottom-0"
                onClick={onClick}
            >
                <i>
                    <ArrowBackIosNewOutlinedIcon fontSize="large" className="opacity-50" />
                </i>
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

    const setting: Settings = {
        slidesToShow: 1,
        infinite: true,
        autoplay: false,
        dots: false,
        autoplaySpeed: 2000,
        arrows: true,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
    };

    return (
        <section className="relative">
            <Slider {...setting}>
                {items.map((item, i) => (
                    <div className="flex relative items-center font-poppins" key={i}>
                        <img
                            className="h-[600px] max-md:h-[380px] w-full object-cover object-center"
                            src={item.url}
                            alt=""
                        />
                        <div className="absolute  top-0 left-0 bottom-0 right-0 bg-gradient-to-r from-black/80 to-gray-500/30">
                            <div className="max-w-[500px] max-md:left-10 max-md:right-10 max-md:max-w-full absolute max-md:bottom-8 bottom-20 left-10 right-10">
                                <div className="w-full max-md:flex max-md:justify-center flex-col items-center">
                                    <h1 className="text-6xl font-medium max-md:text-3xl max-md:line-clamp-1">
                                        {item.name}
                                    </h1>
                                    <p className="my-4 max-md:hidden">{item.description.slice(0, 200)}...</p>
                                    <div className="flex w-full mt-4 items-center gap-2">
                                        <button className="text-black flex items-center justify-center gap-2 px-4 py-2 border-2 border-primary/60 min-w-[90px] max-[800px]:w-80 hover:bg-primary font-semibold uppercase bg-primary/80 bottom">
                                            <span>
                                                <PlayCircleOutlinedIcon fontSize="medium" />
                                            </span>
                                            <span>Xem ngay</span>
                                        </button>
                                        <Tooltip title="Thêm vào danh sách">
                                            <button className="flex justify-center text-primary items-center border-2 h-full px-2 py-2 border-primary">
                                                <i>
                                                    <BookmarkBorderOutlinedIcon fontSize="medium" />
                                                </i>
                                            </button>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </section>
    );
};

export default CarouselUi;
