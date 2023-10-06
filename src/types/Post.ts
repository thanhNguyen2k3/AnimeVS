export interface Post {
    id: string;
    title: string;
    body: string;
    createdAt: string;
    comments?: IComment[];
}

export interface IComment {
    id: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    postId: string;
}
