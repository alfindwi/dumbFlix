package DumbFlix.DumbFlix_BE.service;

import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import DumbFlix.DumbFlix_BE.dto.request.SeriesRequest;
import DumbFlix.DumbFlix_BE.dto.response.CategoryResponse;
import DumbFlix.DumbFlix_BE.dto.response.EpisodeResponse;
import DumbFlix.DumbFlix_BE.dto.response.SeasonResponse;
import DumbFlix.DumbFlix_BE.dto.response.SeriesResponse;
import DumbFlix.DumbFlix_BE.entity.categories.Categories;
import DumbFlix.DumbFlix_BE.entity.series.Episode;
import DumbFlix.DumbFlix_BE.entity.series.Series;
import DumbFlix.DumbFlix_BE.exception.FuncErrorException;
import DumbFlix.DumbFlix_BE.repository.CategoryRepository;
import DumbFlix.DumbFlix_BE.repository.SeriesRepository;
import DumbFlix.DumbFlix_BE.security.util.SlugGenerator;
import jakarta.transaction.Transactional;

@Service
public class SeriesService {

    private final SeriesRepository seriesRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public SeriesService(SeriesRepository seriesRepository, CategoryRepository categoryRepository) {
        this.seriesRepository = seriesRepository;
        this.categoryRepository = categoryRepository;
    }

    @Cacheable(value = "allSeriesCache", key = "'allSeries'")
    public List<SeriesResponse> getAllSeries() {
        List<Series> seriesList = seriesRepository.findAll();

        return seriesList.stream().map(series -> {
            String slug = series.getSlug();
            if (slug == null || slug.trim().isEmpty()) {
                slug = SlugGenerator.generateSlug(series.getSeriesName());
                series.setSlug(slug);
                seriesRepository.save(series);
            }

            SeriesResponse dto = new SeriesResponse();
            dto.setSeriesId(series.getId());
            dto.setSeriesName(series.getSeriesName());
            dto.setSeriesYear(series.getSeriesYear());
            dto.setPoster(series.getPosters());
            dto.setDescription(series.getDescription());
            dto.setTrailer(series.getTrailer());
            dto.setSlug(slug); 

            List<CategoryResponse> categoryResponses = series.getCategories().stream()
                    .map(category -> new CategoryResponse(
                            category.getCategoryId(),
                            category.getCategoryName()))
                    .collect(Collectors.toList());
            dto.setCategories(categoryResponses);

            if (series.getSeasons() != null) {
                dto.setSeasons(series.getSeasons().stream().map(season -> {
                    SeasonResponse seasonDTO = new SeasonResponse();
                    seasonDTO.setSeasonId(season.getSeasonId());
                    seasonDTO.setSeasonNumber(season.getSeasonNumber());
                    return seasonDTO;
                }).collect(Collectors.toList()));
            }

            return dto;
        }).collect(Collectors.toList());
    }

    public SeriesResponse getSeriesByName(String seriesName) {
        Series series = seriesRepository.findBySeriesName(seriesName)
                .orElseThrow(() -> new FuncErrorException("Series not found"));

        SeriesResponse dto = new SeriesResponse();
        dto.setSeriesId(series.getId());
        dto.setSeriesName(series.getSeriesName());
        dto.setSeriesYear(series.getSeriesYear());
        dto.setPoster(series.getPosters());
        dto.setDescription(series.getDescription());
        dto.setTrailer(series.getTrailer());

        List<CategoryResponse> categoryResponses = series.getCategories().stream()
                .map(category -> new CategoryResponse(category.getCategoryId(),
                        category.getCategoryName()))
                .collect(Collectors.toList());
        dto.setCategories(categoryResponses);

        if (series.getSeasons() != null) {
            dto.setSeasons(series.getSeasons().stream().map(season -> {
                SeasonResponse seasonDTO = new SeasonResponse();
                seasonDTO.setSeasonId(season.getSeasonId());
                seasonDTO.setSeasonNumber(season.getSeasonNumber());

                if (season.getEpisodes() != null) {
                    seasonDTO.setEpisodes(season.getEpisodes().stream()
                            .sorted(Comparator.comparingInt(Episode::getEpisodeNumber))
                            .map(episode -> {
                                return new EpisodeResponse(
                                        episode.getId(),
                                        episode.getEpisodeName(),
                                        episode.getEpisodeNumber(),
                                        episode.getEpisodeDescription(),
                                        episode.getEpisodeImage(),
                                        episode.getEpisodeVideo(), episode.getSlug());

                            }).collect(Collectors.toList()));
                }
                return seasonDTO;
            }).collect(Collectors.toList()));
        }

        return dto;
    }

    public SeriesResponse createSeries(SeriesRequest request, String poster) {
        try {
            List<Long> categoryIds = request.getCategoryIds().stream()
                    .map(Integer::longValue)
                    .collect(Collectors.toList());
            List<Categories> categories = categoryRepository.findAllById(categoryIds);

            Series series = new Series();
            series.setSeriesName(request.getSeriesName());
            series.setSeriesYear(request.getSeriesYear());
            series.setPosters(poster);
            series.setDescription(request.getDescription());
            series.setTrailer(request.getTrailer());
            series.setCategories(categories);

            Series savedSeries = seriesRepository.save(series);

            List<CategoryResponse> categoryResponses = savedSeries.getCategories().stream()
                    .map(category -> new CategoryResponse(category.getCategoryId(),
                            category.getCategoryName()))
                    .collect(Collectors.toList());

            return new SeriesResponse(
                    savedSeries.getId(),
                    savedSeries.getSeriesName(),
                    savedSeries.getSeriesYear(),
                    savedSeries.getPosters(),
                    savedSeries.getDescription(),
                    savedSeries.getTrailer(),
                    savedSeries.getSlug(),
                    categoryResponses,
                    Collections.emptyList());
        } catch (Exception e) {
            throw new RuntimeException("Error creating series: " + e.getMessage());
        }
    }

    @Transactional
    public SeriesResponse updateSeries(Long seriesId, SeriesRequest request,
            String posterUrl) {
        try {
            if (seriesId == null) {
                throw new FuncErrorException("Series ID cannot be null");
            }

            Series existingSeries = seriesRepository.findById(seriesId)
                    .orElseThrow(() -> new FuncErrorException("Series not found"));

            existingSeries.setSeriesName(
                    request.getSeriesName() != null ? request.getSeriesName() : existingSeries.getSeriesName());
            existingSeries.setSeriesYear(
                    request.getSeriesYear() != null ? request.getSeriesYear() : existingSeries.getSeriesYear());
            existingSeries.setDescription(
                    request.getDescription() != null ? request.getDescription() : existingSeries.getDescription());
            existingSeries
                    .setTrailer(request.getTrailer() != null ? request.getTrailer() : existingSeries.getTrailer());

            if (posterUrl != null) {
                existingSeries.setPosters(posterUrl);
            }

            if (request.getCategoryIds() != null && !request.getCategoryIds().isEmpty()) {
                List<Long> categoryIds = request.getCategoryIds().stream().map(Integer::longValue)
                        .collect(Collectors.toList());
                List<Categories> categories = categoryRepository.findAllById(categoryIds);
                existingSeries.setCategories(categories);
            }
            Series updatedSeries = seriesRepository.save(existingSeries);
            List<CategoryResponse> categoryResponses = updatedSeries.getCategories().stream()
                    .map(category -> new CategoryResponse(category.getCategoryId(),
                            category.getCategoryName()))
                    .collect(Collectors.toList());

            return new SeriesResponse(
                    updatedSeries.getId(),
                    updatedSeries.getSeriesName(),
                    updatedSeries.getSeriesYear(),
                    updatedSeries.getPosters(),
                    updatedSeries.getDescription(),
                    updatedSeries.getTrailer(),
                    updatedSeries.getSlug(),
                    categoryResponses,
                    Collections.emptyList());
        } catch (Exception e) {
            throw new FuncErrorException("Failed to update series: " + e.getMessage());
        }
    }

    public Map<String, String> deleteSeries(Long seriesId) {
        try {
            Optional<Series> series = seriesRepository.findById(seriesId);
            if (series.isEmpty()) {
                throw new FuncErrorException("Series not found");
            }

            seriesRepository.delete(series.get());

            Map<String, String> response = new HashMap<>();
            response.put("message", "Series deleted successfully");

            return response;
        } catch (Exception e) {
            throw new FuncErrorException("Failed to delete series: " + e.getMessage());
        }
    }
}
