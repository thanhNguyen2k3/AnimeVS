'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useEffect, Dispatch, SetStateAction } from 'react';
import { useDropzone } from 'react-dropzone';

type UploadProps = {
    files: File[];
    setFiles: Dispatch<SetStateAction<File[]>>;
};

export function UploadFiles({ files, setFiles }: UploadProps) {
    const thumbs = files?.map((file: any) => (
        <Box
            className="inline-flex border border-gray-500 rounded-sm w-24 h-24 p-1 box-border mb-2 mr-2 "
            key={file.name}
        >
            <Box className="flex min-w-0 overflow-hidden">
                <img
                    alt={file.preview}
                    src={file.preview}
                    className="w-auto h-full block"
                    onLoad={() => {
                        URL.revokeObjectURL(file.preview);
                    }}
                />
            </Box>
        </Box>
    ));

    useEffect(() => {
        return () => files?.forEach((file: any) => URL.revokeObjectURL(file.preview));
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': [],
        },

        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    }),
                ),
            );
        },
    });

    return (
        <Box className="mt-2  rounded-sm flex items-center gap-4 px-2 py-2">
            <Box {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <Button type="button" className="px-2 py-2 bg-gray-200 rounded hover:bg-gray-500 hover:text-white">
                    Tải nhiều ảnh lên
                </Button>
            </Box>
            <Box className=" flex flex-row flex-wrap mt-4">{thumbs}</Box>
        </Box>
    );
}

export default UploadFiles;
