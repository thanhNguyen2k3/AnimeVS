'use client';

import instance from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from 'react';
import ButtonVariant from './ui/ButtonVariant';
import TextField from '@mui/material/TextField';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';
import { useSession } from 'next-auth/react';
import AuthModal from './ui/modal/AuthModal';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';

type Props = {
    movieId: string;
    replyToId?: string;
    setIsNested?: Dispatch<SetStateAction<boolean>>;
};

const CreateComment = ({ movieId, replyToId, setIsNested }: Props) => {
    const router = useRouter();
    const { data: session, status } = useSession();

    const [input, setInput] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmitForm = async (e: FormEvent) => {
        e.preventDefault();

        if (status === 'unauthenticated' || !session) {
            setOpen(true);
            return;
        } else {
            try {
                const { data, status } = await instance.patch('/comment', {
                    movieId,
                    replyToId,
                    text: input,
                });

                setIsLoading(true);

                if (status === 200) {
                    inputRef.current?.focus();
                    setInput('');
                    setIsLoading(false);
                    router.refresh();
                }

                return data;
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <div className="grid w-full gap-1.5  mb-3">
                <form onSubmit={handleSubmitForm}>
                    <div className="flex items-center flex-col px-3 py-2 rounded-lg  bg-gray-500/40">
                        <FormControl fullWidth>
                            <Input
                                value={input}
                                multiline
                                onChange={(e) => setInput(e.target.value)}
                                className="text-white"
                                size="medium"
                                disableUnderline
                                placeholder="Bình luận..."
                            />
                        </FormControl>

                        <div className="flex justify-between w-full mt-2">
                            <div className="flex gap-x-2">
                                <i>
                                    <EmojiEmotionsOutlinedIcon
                                        className="text-gray-500 font-semibold cursor-pointer"
                                        fontSize="medium"
                                    />
                                </i>
                                <i>
                                    <BrokenImageOutlinedIcon
                                        className="text-gray-500 font-semibold cursor-pointer"
                                        fontSize="medium"
                                    />
                                </i>
                            </div>
                            <div className="flex gap-x-2">
                                {setIsNested && (
                                    <ButtonVariant
                                        color="inherit"
                                        className="text-gray-500"
                                        handleClick={() => setIsNested!(false)}
                                        type="button"
                                        title="Hủy"
                                        isLoading={isLoading}
                                    />
                                )}
                                <ButtonVariant
                                    isLoading={isLoading}
                                    type="submit"
                                    title="Đăng"
                                    className="text-secondary"
                                    disabled={input.length === 0}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <AuthModal open={open} setState={setOpen} />
        </>
    );
};

export default CreateComment;
