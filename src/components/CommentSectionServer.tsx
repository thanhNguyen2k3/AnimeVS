import { db } from '@/lib/db';
import MovieComment from './componentsChildren/MovieComment';
import CreateComment from './CreateComment';
import { Suspense } from 'react';
import ExpandMoreComment from './componentsChildren/ExpandMoreComment';
import Link from 'next/link';

type Props = {
    movieId: string;
};

export type ValueCommentProps = {
    movieId: string;
    replyToId?: string;
    text?: string;
};

const CommentSectionServer = async ({ movieId }: Props) => {
    const comments = await db.comment.findMany({
        where: {
            movieId,
            replyTo: null,
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            user: true,
            replies: {
                include: {
                    user: true,
                },
            },
        },
    });

    return (
        <div className="mt-6">
            <section className="bg-gray-800/40 rounded py-4 px-6  lg:py-6 antialiased">
                <CreateComment movieId={movieId} />

                {comments.length === 0 ? (
                    <div className="flex justify-center items-center space-y-4 flex-col my-40 px-12">
                        <img src="https://www.crunchyroll.com/build/assets/img/home/yuzu.png" alt="" />

                        <h1>Chưa có bình luận nào 😥</h1>

                        <button className="border-[4px] max-md:text-sm hover:border-primary/90 hover:text-primary/90 border-primary px-6 py-2 text-lg font-semibold text-primary ">
                            <Link href="/list-movie">VIEW ALL</Link>
                        </button>
                    </div>
                ) : (
                    comments
                        .filter((comment) => !comment.replyToId)
                        .map((topLevelComment) => {
                            return (
                                <div key={topLevelComment.id} className="flex flex-col mb-2">
                                    <div>
                                        <Suspense fallback={<h1>...Loading</h1>}>
                                            <MovieComment movieId={movieId} comment={topLevelComment} />
                                        </Suspense>
                                    </div>
                                    {/* Render replies */}
                                    {topLevelComment.replies.length > 0 ? (
                                        <div>
                                            <ExpandMoreComment
                                                movieId={movieId}
                                                topLevelComment={topLevelComment as any}
                                            />
                                        </div>
                                    ) : null}
                                </div>
                            );
                        })
                )}
            </section>
        </div>
    );
};

export default CommentSectionServer;
