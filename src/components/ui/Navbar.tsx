'use client';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import SwipeableDrawerLeft from './SwipeableDrawerLeft';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserLinks from '../UserLinks';
import { Category } from '@prisma/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';

type PageProps = {
    categories: Category[];
};

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
    },
});

const ResponsiveAppBar = ({ categories }: PageProps) => {
    const pages = ['Products', 'Pricing', 'Blog'];

    const pathname = usePathname();

    const [open, setOpen] = useState<boolean>(false);

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar component={'div'} position="sticky" color="default">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>

                        <SwipeableDrawerLeft categories={categories} />

                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
                            <ul className="space-x-3">
                                <li className="inline-block">
                                    <Button
                                        sx={{ py: 2, color: 'currentcolor', display: 'flex', alignItems: 'center' }}
                                    >
                                        <Link href={'/'}>Trang chủ</Link>
                                    </Button>
                                </li>
                                <li className="relative inline-block">
                                    <Button
                                        onClick={() => setOpen(!open)}
                                        endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                        sx={{ py: 2, color: 'currentcolor', display: 'flex', alignItems: 'center' }}
                                    >
                                        Thể loại
                                    </Button>

                                    {open && (
                                        <div className="grid grid-cols-3 min-w-[600px] top-full left-0 absolute bg-[#333] shadow shadow-black">
                                            {categories.map((category) => (
                                                <Link
                                                    key={category.id}
                                                    href={`/list-movie/${category.slug}`}
                                                    className="px-6 py-2 hover:bg-gray-900"
                                                >
                                                    {category.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            </ul>
                        </Box>

                        <UserLinks />
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
};
export default ResponsiveAppBar;
