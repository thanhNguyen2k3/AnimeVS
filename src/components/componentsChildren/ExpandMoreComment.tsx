'use client';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import MovieComment from './MovieComment';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Comment, User } from '@prisma/client';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type ExtendComment = Comment & {
    user: User;
    replies: Comment[];
};

type PageProps = {
    movieId: string;
    topLevelComment: {
        replies: ExtendComment[];
    };
};

const ExpandMoreComment = ({ topLevelComment, movieId }: PageProps) => {
    return (
        <Accordion className="shadow-none pl-6 bg-transparent">
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <p className="text-secondary pl-6">{topLevelComment.replies.length} Phản hồi</p>
            </AccordionSummary>
            <AccordionDetails className="py-0 pl-6">
                <div className="flex flex-col gap-y-2">
                    {topLevelComment.replies.map((reply) => {
                        return (
                            <div key={reply.id}>
                                <MovieComment comment={reply} movieId={movieId} />
                            </div>
                        );
                    })}
                </div>
            </AccordionDetails>
        </Accordion>
    );
};

export default ExpandMoreComment;
