'use client';

import { FormEvent, useRef, useState } from 'react';
import { Comment, User } from '@prisma/client';
import Avatar from '@mui/material/Avatar';
import { formatTimeToNow } from '@/utils/formater';
import QuickreplyOutlinedIcon from '@mui/icons-material/QuickreplyOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import Button from '@mui/material/Button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import instance from '@/lib/axios';
import ButtonVariant from '../ui/ButtonVariant';
import TextField from '@mui/material/TextField';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';
import AuthModal from '../ui/modal/AuthModal';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';

type ExtenedComment = Comment & {
    user: User;
};

type Props = {
    comment: ExtenedComment;
    movieId: string;
};

const MovieComment = ({ comment, movieId }: Props) => {
    const router = useRouter();

    const [isNested, setIsNested] = useState<boolean>(false);

    const commentRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [input, setInput] = useState<string>('');

    const { data: session } = useSession();

    const handleSubmitReply = async (e: FormEvent) => {
        e.preventDefault();

        if (!session) {
            setOpen(true);
            return;
        } else {
            try {
                const res = await instance.patch('/comment', {
                    movieId,
                    text: input,
                    replyToId: comment.replyToId ?? comment.id,
                });

                setIsLoading(true);

                if (res.status === 200) {
                    inputRef.current?.focus();
                    setInput('');
                    setIsLoading(false);
                    router.refresh();
                }

                return res.data;
            } catch (error) {
                return error;
            }
        }
    };

    return (
        <>
            <div ref={commentRef} className="flex flex-col">
                <div className="flex gap-x-2">
                    <div className="flex gap-x-4">
                        <div>
                            {comment.user.image ? (
                                <Avatar src={comment.user.image} />
                            ) : (
                                <Avatar>{comment.user.name}</Avatar>
                            )}
                        </div>
                        <div>
                            <div className="flex">
                                <p className="text-sm font-medium text-gray-200 line-clamp-1">{comment.user.name}</p>
                                <p className="max-h-40 truncate text-xs text-zinc-500 ml-2">
                                    {formatTimeToNow(new Date(comment.createdAt))}
                                </p>
                            </div>
                            <p className="text-sm line-breaker text-gray-200 mt-1 font-semiboldl">{comment.text}</p>

                            <div className="flex gap-x-8 items-center">
                                <i className="hover:cursor-pointer ">
                                    <ThumbUpAltOutlinedIcon
                                        fontSize="small"
                                        className="text-lg text-gray-200 hover:text-secondary"
                                    />
                                </i>
                                <i className="hover:cursor-pointer ">
                                    <ThumbDownOffAltOutlinedIcon
                                        fontSize="small"
                                        className="text-lg text-gray-200 hover:text-secondary"
                                    />
                                </i>
                                <div className="hover:cursor-pointer ">
                                    <Button
                                        onClick={() => setIsNested(true)}
                                        className="text-[10px] text-gray-500"
                                        startIcon={
                                            <QuickreplyOutlinedIcon
                                                fontSize="small"
                                                className="text-lg text-gray-200 hover:text-secondary"
                                            />
                                        }
                                    >
                                        <span className="line-clamp-1 text-gray-200">Phản hồi</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isNested && (
                    <div className="grid w-full gap-1.5">
                        <form onSubmit={handleSubmitReply}>
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
                )}
            </div>

            <AuthModal open={open} setState={setOpen} />
        </>
    );
};

export default MovieComment;
