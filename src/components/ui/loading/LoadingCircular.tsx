import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

const LoadingCircular = () => {
    return (
        <div className="flex justify-center items-center w-full h-screen">
            <CircularProgress
                sx={{
                    color: '#f47521',
                }}
                size={60}
            />
        </div>
    );
};

export default LoadingCircular;
