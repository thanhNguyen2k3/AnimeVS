import DashboardIcon from '@mui/icons-material/Dashboard';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import AddLinkIcon from '@mui/icons-material/AddLink';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import DeleteIcon from '@mui/icons-material/Delete';
import CategoryIcon from '@mui/icons-material/Category';

export const privateRoutes = [
    {
        id: 1,
        to: '/admin/dashboard',
        Icon: DashboardIcon,
        linkName: 'Dashboard',
    },
    {
        id: 2,
        to: '/admin/movies',
        Icon: SlideshowIcon,
        linkName: 'Movies',
    },
    {
        id: 3,
        to: '/admin/movies/create',
        Icon: CreateNewFolderIcon,
        linkName: 'Thêm movie',
    },
    {
        id: 4,
        to: '/admin/playlist',
        Icon: PlaylistPlayIcon,
        linkName: 'Danh sách phát',
    },
    {
        id: 5,
        to: '/admin/video-url',
        Icon: AddLinkIcon,
        linkName: 'Đường dẫn phim',
    },
    {
        id: 6,
        to: '/admin/movies/trash',
        Icon: DeleteIcon,
        linkName: 'Thùng rác',
    },
    {
        id: 7,
        to: '/admin/category',
        Icon: CategoryIcon,
        linkName: 'Thể loại',
    },
];
