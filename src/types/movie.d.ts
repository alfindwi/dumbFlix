export interface IMovie {
  id: number;
  title: string;
  description: string;
  year: string;
  thumbnail: string;
  poster: string;
  trailer: string;
  video: string;
  categories: ICategory[];
}
