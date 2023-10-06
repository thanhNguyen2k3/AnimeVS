import { Icon } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { ReactNode } from 'react';

type Props = {
    childrenIcon?: ReactNode;
    title?: string;
};

const Heading = ({ childrenIcon, title }: Props) => {
    return (
        <div className="w-full mb-4 mt-6 px-20 max-[800px]:px-3 ">
            <div className="flex items-center gap-1">
                <IconButton sx={{ p: 0 }}>{childrenIcon}</IconButton>
                <h1 className="text-2xl font-semibold uppercase max-[800px]:text-lg">{title}</h1>
            </div>
        </div>
    );
};

export default Heading;
