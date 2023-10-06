export interface MovieInput {
    name: string;
    subname: string;
    description: string;
    director: string;
    showtime: string | null;
    status?: string | null;
    episode: string;
    quality: string;
    studioId?: string;
    thumbnail?: string;
    seasonId?: string;
    nationId?: string;
    movieParentId?: string;
    categoryId?: string;
}
