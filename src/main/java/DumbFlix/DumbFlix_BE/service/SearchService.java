package DumbFlix.DumbFlix_BE.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import DumbFlix.DumbFlix_BE.dto.response.SearchResultResponse;
import DumbFlix.DumbFlix_BE.entity.movie.Movies;
import DumbFlix.DumbFlix_BE.entity.series.Series;
import DumbFlix.DumbFlix_BE.exception.FuncErrorException;
import DumbFlix.DumbFlix_BE.repository.MovieRepository;
import DumbFlix.DumbFlix_BE.repository.SeriesRepository;

@Service
public class SearchService {

    @Autowired
    private SeriesRepository seriesRepository;

    @Autowired
    private MovieRepository movieRepository;

    public List<SearchResultResponse> searchAll(String keyword) {
        List<Movies> foundMovies = movieRepository.findByTitleContainingIgnoreCase(keyword);
        List<Series> foundSeries = seriesRepository.findBySeriesNameContainingIgnoreCase(keyword);

        if (foundMovies.isEmpty() && foundSeries.isEmpty()) {
            throw new FuncErrorException("No results found for keyword: " + keyword);
        }

        List<SearchResultResponse> results = new ArrayList<>();

        for (Movies movies : foundMovies) {
            SearchResultResponse res = new SearchResultResponse();
            res.setType("movie");
            res.setTitle(movies.getTitle());
            res.setSlug(movies.getSlug());
            res.setPoster(movies.getPosters());
            res.setDescription(movies.getDescription());
            res.setYear(movies.getYear());
            results.add(res);
        }

        for (Series series : foundSeries) {
            SearchResultResponse res = new SearchResultResponse();
            res.setType("series");
            res.setTitle(series.getSeriesName());
            res.setSlug(series.getSeriesSlug());
            res.setPoster(series.getPosters());
            res.setDescription(series.getDescription());
            res.setYear(series.getSeriesYear());
            results.add(res);
        }

        return results;
    }

}
