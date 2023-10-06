'use client';

import { styled } from '@mui/material/styles';
import usePagination from '@mui/material/usePagination';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type Props = {
    count?: number;
};

const List = styled('ul')({
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
});

const Paginated = ({ count }: Props) => {
    const searchParams = useSearchParams();
    const page = searchParams.get('page') ?? '1';
    const selectedPage = Number(page);
    const { items } = usePagination({
        count: count,
        showFirstButton: selectedPage! !== 1 ? true : false,
        showLastButton: count === selectedPage ? false : true,
        hidePrevButton: true,
        hideNextButton: true,
    });

    return (
        <div className="flex justify-center my-6">
            <List>
                {items.map(({ page, type, selected, ...item }, index) => {
                    let children = null;

                    if (type === 'start-ellipsis' || type === 'end-ellipsis') {
                        children = '…';
                    } else if (type === 'page') {
                        children = (
                            <button
                                className={`px-4 py-2 rounded hover:bg-secondary ${
                                    page === selectedPage ? 'bg-primary' : 'bg-gray-800'
                                } ${selected ? 'pointer-events-none cursor-default' : ''}`}
                                {...item}
                            >
                                {page}
                            </button>
                        );
                    } else {
                        children = (
                            <button
                                className="px-4 capitalize py-2 rounded hover:bg-secondary bg-gray-800"
                                type="button"
                            >
                                {type}
                            </button>
                        );
                    }

                    return (
                        <Link href={`?page=${page}`} key={index}>
                            {children}
                        </Link>
                    );
                })}
            </List>
        </div>
    );
};

export default Paginated;
