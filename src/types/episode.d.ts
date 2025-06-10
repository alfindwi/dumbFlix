export interface IEpisode {
  id: number;
  episodeName: string;
  episodeNumber: number;
  episodeDescription: string;
  episodeImage: string;
  seasonId: number;
  episodeVideo: string;
  episodeSeries: string;
  episodeSlug: string;
  seriesName?: string;
  seasonNumber?: number;
}
