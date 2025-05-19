package DumbFlix.DumbFlix_BE.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import DumbFlix.DumbFlix_BE.dto.request.MovieRequest;
import DumbFlix.DumbFlix_BE.dto.response.CategoryResponse;
import DumbFlix.DumbFlix_BE.dto.response.MovieResponse;
import DumbFlix.DumbFlix_BE.entity.categories.Categories;
import DumbFlix.DumbFlix_BE.entity.movie.Movies;
import DumbFlix.DumbFlix_BE.exception.FuncErrorException;
import DumbFlix.DumbFlix_BE.repository.CategoryRepository;
import DumbFlix.DumbFlix_BE.repository.MovieRepository;

@Service
public class MovieService {
        private final MovieRepository movieRepository;

        private final CategoryRepository categoryRepository;

        @Autowired
        public MovieService(MovieRepository movieRepository, CategoryRepository categoryRepository) {
                this.movieRepository = movieRepository;
                this.categoryRepository = categoryRepository;
        }

        public List<MovieResponse> getAllMovies() {
                List<Movies> movies = movieRepository.findAll();

                return movies.stream()
                                .map(movie -> {
                                        List<CategoryResponse> categoryResponses = movie.getCategories().stream()
                                                        .map(category -> new CategoryResponse(category.getCategoryId(),
                                                                        category.getCategoryName()))
                                                        .collect(Collectors.toList());

                                        return new MovieResponse(movie.getMovieId(), movie.getTitle(),
                                                        movie.getDescription(),
                                                        movie.getYear(), movie.getTrailer(), movie.getThumbnail(),
                                                        movie.getVideo(),
                                                        movie.getPosters(),
                                                        categoryResponses);
                                }).collect(Collectors.toList());
        }

        public MovieResponse getMovieById(Long movieId) {
                Movies movies = movieRepository.findById(movieId)
                                .orElseThrow(() -> new FuncErrorException("Movie not found"));

                List<CategoryResponse> categoryResponses = movies.getCategories().stream()
                                .map(category -> new CategoryResponse(category.getCategoryId(),
                                                category.getCategoryName()))
                                .collect(Collectors.toList());

                return new MovieResponse(movies.getMovieId(), movies.getTitle(), movies.getDescription(),
                                movies.getYear(),
                                movies.getTrailer(), movies.getThumbnail(), movies.getVideo(), movies.getPosters(),
                                categoryResponses);
        }

        public MovieResponse getMovieByName(String title) {
                Movies movies = movieRepository.findByTitle(title)
                                .orElseThrow(() -> new FuncErrorException("Movie not found"));

                List<CategoryResponse> categoryResponses = movies.getCategories().stream()
                                .map(category -> new CategoryResponse(category.getCategoryId(),
                                                category.getCategoryName()))
                                .collect(Collectors.toList());

                return new MovieResponse(movies.getMovieId(), movies.getTitle(), movies.getDescription(),
                                movies.getYear(),
                                movies.getTrailer(), movies.getThumbnail(), movies.getVideo(), movies.getPosters(),
                                categoryResponses);
        }

        public List<MovieResponse> getMoviesByCategory(Long categoryId) {
                List<Movies> movies = movieRepository.findByCategories_CategoryId(categoryId);

                return movies.stream()
                                .map(movie -> {
                                        List<CategoryResponse> categoryResponses = movie.getCategories().stream()
                                                        .map(category -> new CategoryResponse(category.getCategoryId(),
                                                                        category.getCategoryName()))
                                                        .collect(Collectors.toList());

                                        return new MovieResponse(movie.getMovieId(), movie.getTitle(),
                                                        movie.getDescription(),
                                                        movie.getYear(), movie.getTrailer(), movie.getThumbnail(),
                                                        movie.getVideo(),
                                                        movie.getPosters(),
                                                        categoryResponses);
                                }).collect(Collectors.toList());
        }

        public MovieResponse createMovie(MovieRequest request, String thumbnailUrl, String videoUrl, String poster) {

                List<Long> categoryIds = request.getCategoryIds().stream()
                                .map(Integer::longValue)
                                .collect(Collectors.toList());

                List<Categories> categories = categoryRepository.findAllById(categoryIds);

                Movies movies = new Movies();
                movies.setTitle(request.getTitle());
                movies.setDescription(request.getDescription());
                movies.setYear(request.getYear());
                movies.setTrailer(request.getTrailer());
                movies.setThumbnail(thumbnailUrl);
                movies.setPosters(poster);
                movies.setVideo(videoUrl);
                movies.setCategories(categories);

                Movies savedMovies = movieRepository.save(movies);

                List<CategoryResponse> categoryResponses = savedMovies.getCategories().stream()
                                .map(category -> new CategoryResponse(category.getCategoryId(),
                                                category.getCategoryName()))
                                .collect(Collectors.toList());

                return new MovieResponse(savedMovies.getMovieId(), savedMovies.getTitle(), savedMovies.getDescription(),
                                savedMovies.getYear(), savedMovies.getTrailer(), savedMovies.getThumbnail(),
                                savedMovies.getVideo(),
                                savedMovies.getPosters(),
                                categoryResponses);
        }

        public MovieResponse updateMovie(Long movieId, MovieRequest request, String thumbnailUrl, String videoUrl,
                        String posterUrl) {
                try {
                        Movies existingMovie = movieRepository.findById(movieId)
                                        .orElseThrow(() -> new FuncErrorException("Movie not found"));

                        existingMovie.setTitle(
                                        request.getTitle() != null ? request.getTitle() : existingMovie.getTitle());
                        existingMovie.setDescription(request.getDescription() != null ? request.getDescription()
                                        : existingMovie.getDescription());
                        existingMovie.setYear(request.getYear() != null ? request.getYear() : existingMovie.getYear());
                        existingMovie.setTrailer(request.getTrailer() != null ? request.getTrailer()
                                        : existingMovie.getTrailer());

                        if (posterUrl != null) {
                                existingMovie.setPosters(posterUrl);
                        }

                        if (thumbnailUrl != null) {
                                existingMovie.setThumbnail(thumbnailUrl);
                        }

                        if (videoUrl != null) {
                                existingMovie.setVideo(videoUrl);
                        }

                        if (request.getCategoryIds() != null && !request.getCategoryIds().isEmpty()) {
                                List<Long> categoryIds = request.getCategoryIds().stream().map(Integer::longValue)
                                                .collect(Collectors.toList());
                                List<Categories> categories = categoryRepository.findAllById(categoryIds);
                                existingMovie.setCategories(categories);
                        }

                        Movies updatedMovie = movieRepository.save(existingMovie);

                        List<CategoryResponse> categoryResponses = updatedMovie.getCategories().stream()
                                        .map(c -> new CategoryResponse(c.getCategoryId(), c.getCategoryName()))
                                        .collect(Collectors.toList());

                        return new MovieResponse(
                                        updatedMovie.getMovieId(),
                                        updatedMovie.getTitle(),
                                        updatedMovie.getDescription(),
                                        updatedMovie.getYear(),
                                        updatedMovie.getTrailer(),
                                        updatedMovie.getThumbnail(),
                                        updatedMovie.getVideo(),
                                        updatedMovie.getPosters(),
                                        categoryResponses);
                } catch (Exception e) {
                        e.printStackTrace();
                        throw new FuncErrorException("Failed to update movie: " + e.getMessage());
                }
        }

        public Map<String, String> deleteMovies(Long movieId) {
                try {
                        Optional<Movies> movies = movieRepository.findById(movieId);
                        if (movies.isEmpty()) {
                                throw new FuncErrorException("Series not found");
                        }

                        movieRepository.delete(movies.get());

                        Map<String, String> response = new HashMap<>();
                        response.put("message", "Movies deleted successfully");

                        return response;
                } catch (Exception e) {
                        throw new FuncErrorException("Failed to delete movie: " + e.getMessage());
                }
        }
}
