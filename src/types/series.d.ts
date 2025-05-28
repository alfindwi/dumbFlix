export interface ISeries {
    id: number;
    seriesName: string;
    seriesYear: string;
    description: string;
    poster: string;
    trailer: string;
    categories: ICategory[];
    seasons: ISeason[];
}