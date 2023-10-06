import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import { useState, MouseEvent, Suspense } from 'react';

const UserLinks = () => {
    const { data, status } = useSession();
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogoutSubmit = async () => {
        signOut();
    };

    return (
        <div>
            {status === 'authenticated' ? (
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src={data.user?.image!} />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">Profile</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">Account</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">Setting</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleLogoutSubmit}>
                            <Typography textAlign="center">Logout</Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            ) : status === 'loading' ? (
                <Suspense fallback={'...đang tải'}></Suspense>
            ) : (
                <Link href={'/sign-in'}>Sign in</Link>
            )}
        </div>
    );
};

export default UserLinks;
