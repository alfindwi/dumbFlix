export interface IEpisode {
  id: number;
  episodeName: string;
  episodeNumber: number;
  episodeDescription: string;
  episodeImage: string;
  seasonId: number;
  episodeVideo: string;
  seriesName?: string;
  seasonNumber?: number;
}
