'use client';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Category } from '@prisma/client';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';

type PageProps = {
    categories: Category[];
};

const SwipeableDrawerLeft = ({ categories }: PageProps) => {
    const [state, setState] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleClose = () => {
        setState(false);
    };

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setState(open);
    };

    const list = () => (
        <Box sx={{ width: 250 }} role="presentation" onKeyDown={toggleDrawer(false)}>
            <List sx={{ width: '100%', maxWidth: 360 }} component="nav" aria-labelledby="nested-list-subheader">
                <ListItemButton>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText onClick={handleClose} primary={<Link href={'/'}>Trang chủ</Link>} />
                </ListItemButton>
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Thể loại" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding className="max-md:text-base">
                        {categories.map((category) => (
                            <ListItemButton key={category.id} sx={{ pl: 4 }}>
                                <ListItemText
                                    onClick={handleClose}
                                    primary={<Link href={`/list-movie/${category.slug}`}>{category.name}</Link>}
                                />
                            </ListItemButton>
                        ))}
                    </List>
                </Collapse>
            </List>
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleDrawer(true)}
                color="inherit"
            >
                <MenuIcon />
            </IconButton>
            <SwipeableDrawer anchor={'left'} open={state} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
                {list()}
            </SwipeableDrawer>
        </Box>
    );
};

export default SwipeableDrawerLeft;
