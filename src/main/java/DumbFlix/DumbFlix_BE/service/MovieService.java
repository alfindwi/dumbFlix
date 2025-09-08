package DumbFlix.DumbFlix_BE.service;

import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import DumbFlix.DumbFlix_BE.dto.request.MovieRequest;
import DumbFlix.DumbFlix_BE.dto.response.ActorResponse;
import DumbFlix.DumbFlix_BE.dto.response.CategoryResponse;
import DumbFlix.DumbFlix_BE.dto.response.DirectorResponse;
import DumbFlix.DumbFlix_BE.dto.response.MovieResponse;
import DumbFlix.DumbFlix_BE.entity.actors.Actors;
import DumbFlix.DumbFlix_BE.entity.categories.Categories;
import DumbFlix.DumbFlix_BE.entity.directors.Directors;
import DumbFlix.DumbFlix_BE.entity.movie.Movies;
import DumbFlix.DumbFlix_BE.exception.FuncErrorException;
import DumbFlix.DumbFlix_BE.repository.ActorRepository;
import DumbFlix.DumbFlix_BE.repository.CategoryRepository;
import DumbFlix.DumbFlix_BE.repository.DirectorRepository;
import DumbFlix.DumbFlix_BE.repository.MovieRepository;
import DumbFlix.DumbFlix_BE.security.util.SlugGenerator;

@Service
public class MovieService {
        private final MovieRepository movieRepository;
        private final CategoryRepository categoryRepository;
        private final ActorRepository actorRepository;
        private final DirectorRepository directorRepository;

        @Autowired
        public MovieService(MovieRepository movieRepository, CategoryRepository categoryRepository,
                        ActorRepository actorRepository,
                        DirectorRepository directorRepository) {
                this.movieRepository = movieRepository;
                this.categoryRepository = categoryRepository;
                this.actorRepository = actorRepository;
                this.directorRepository = directorRepository;
        }

        @Cacheable(value = "allMoviesCache", key = "'allMovies'")
        public List<MovieResponse> getAllMovies() {
                List<Movies> movies = movieRepository.findAllWithRelations();

                return movies.stream()
                                .map(movie -> {

                                        List<CategoryResponse> categoryResponses = movie.getCategories().stream()
                                                        .map(category -> new CategoryResponse(category.getCategoryId(),
                                                                        category.getCategoryName()))
                                                        .collect(Collectors.toList());
                                        List<ActorResponse> actorResponses = movie.getActors().stream()
                                                        .map(actor -> new ActorResponse(actor.getActorId(),
                                                                        actor.getName(),
                                                                        actor.getImage(), actor.getSlug()))
                                                        .collect(Collectors.toList());
                                        List<DirectorResponse> directorResponses = movie.getDirectors().stream()
                                                        .map(director -> new DirectorResponse(director.getDirectorId(),
                                                                        director.getName(), director.getImage(),
                                                                        director.getSlug()))
                                                        .collect(Collectors.toList());

                                        return new MovieResponse(movie.getMovieId(), movie.getTitle(),
                                                        movie.getDescription(),
                                                        movie.getYear(), movie.getTrailer(), movie.getThumbnail(),
                                                        movie.getVideo(),
                                                        movie.getSlug(),
                                                        movie.getPosters(),
                                                        categoryResponses,
                                                        actorResponses,
                                                        directorResponses);
                                })
                                .collect(Collectors.toList());
        }

        public MovieResponse getMovieById(Long movieId) {
                Movies movie = movieRepository.findById(movieId)
                                .orElseThrow(() -> new FuncErrorException("Movie not found"));

                List<CategoryResponse> categoryResponses = movie.getCategories().stream()
                                .map(category -> new CategoryResponse(category.getCategoryId(),
                                                category.getCategoryName()))
                                .collect(Collectors.toList());
                List<ActorResponse> actorResponses = movie.getActors().stream()
                                .map(actor -> new ActorResponse(actor.getActorId(),
                                                actor.getName(),
                                                actor.getImage(), actor.getSlug()))
                                .collect(Collectors.toList());
                List<DirectorResponse> directorResponses = movie.getDirectors().stream()
                                .map(director -> new DirectorResponse(director.getDirectorId(),
                                                director.getName(), director.getImage(),
                                                director.getSlug()))
                                .collect(Collectors.toList());

                return new MovieResponse(movie.getMovieId(), movie.getTitle(),
                                movie.getDescription(),
                                movie.getYear(), movie.getTrailer(), movie.getThumbnail(),
                                movie.getVideo(),
                                movie.getSlug(),
                                movie.getPosters(),
                                categoryResponses,
                                actorResponses,
                                directorResponses);
        }

        @Cacheable(value = "movieBySlugCache", key = "'movieBySlug' + #slug")
        public MovieResponse getMovieBySlug(String slug) {
                Movies movie = movieRepository.findBySlug(slug)
                                .orElseThrow(() -> new FuncErrorException("Movie not found"));

                List<CategoryResponse> categoryResponses = movie.getCategories().stream()
                                .map(category -> new CategoryResponse(category.getCategoryId(),
                                                category.getCategoryName()))
                                .collect(Collectors.toList());
                List<ActorResponse> actorResponses = movie.getActors().stream()
                                .map(actor -> new ActorResponse(actor.getActorId(),
                                                actor.getName(),
                                                actor.getImage(), actor.getSlug()))
                                .collect(Collectors.toList());
                List<DirectorResponse> directorResponses = movie.getDirectors().stream()
                                .map(director -> new DirectorResponse(director.getDirectorId(),
                                                director.getName(), director.getImage(),
                                                director.getSlug()))
                                .collect(Collectors.toList());


                return new MovieResponse(movie.getMovieId(), movie.getTitle(),
                                movie.getDescription(),
                                movie.getYear(), movie.getTrailer(), movie.getThumbnail(),
                                movie.getVideo(),
                                movie.getSlug(),
                                movie.getPosters(),
                                categoryResponses,
                                actorResponses,
                                directorResponses);

        }

        public List<MovieResponse> getMoviesByCategory(Long categoryId) {
                List<Movies> movies = movieRepository.findByCategories_CategoryId(categoryId);

                return movies.stream()
                                .map(movie -> {
                                        List<CategoryResponse> categoryResponses = movie.getCategories().stream()
                                                        .map(category -> new CategoryResponse(category.getCategoryId(),
                                                                        category.getCategoryName()))
                                                        .collect(Collectors.toList());
                                        List<ActorResponse> actorResponses = movie.getActors().stream()
                                                        .map(actor -> new ActorResponse(actor.getActorId(),
                                                                        actor.getName(),
                                                                        actor.getImage(), actor.getSlug()))
                                                        .collect(Collectors.toList());
                                        List<DirectorResponse> directorResponses = movie.getDirectors().stream()
                                                        .map(director -> new DirectorResponse(director.getDirectorId(),
                                                                        director.getName(), director.getImage(),
                                                                        director.getSlug()))
                                                        .collect(Collectors.toList());

                                        return new MovieResponse(movie.getMovieId(), movie.getTitle(),
                                                        movie.getDescription(),
                                                        movie.getYear(), movie.getTrailer(), movie.getThumbnail(),
                                                        movie.getVideo(),
                                                        movie.getSlug(),
                                                        movie.getPosters(),
                                                        categoryResponses,
                                                        actorResponses,
                                                        directorResponses);
                                }).collect(Collectors.toList());
        }

        public List<MovieResponse> getMovieByActors(String slug) {
                List<Movies> movies = movieRepository.findByActors_Slug(slug);

                return movies.stream().map(movie -> {
                        List<CategoryResponse> categoryResponses = movie.getCategories().stream()
                                        .map(c -> new CategoryResponse(c.getCategoryId(), c.getCategoryName()))
                                        .collect(Collectors.toList());

                        List<ActorResponse> actorResponses = movie.getActors().stream()
                                        .map(a -> new ActorResponse(a.getActorId(), a.getName(), a.getImage(),
                                                        a.getSlug()))
                                        .collect(Collectors.toList());

                        List<DirectorResponse> directorResponses = movie.getDirectors().stream()
                                        .map(d -> new DirectorResponse(d.getDirectorId(), d.getName(), d.getImage(),
                                                        d.getSlug()))
                                        .collect(Collectors.toList());

                        return new MovieResponse(
                                        movie.getMovieId(),
                                        movie.getTitle(),
                                        movie.getDescription(),
                                        movie.getYear(),
                                        movie.getTrailer(),
                                        movie.getThumbnail(),
                                        movie.getVideo(),
                                        movie.getSlug(),
                                        movie.getPosters(),
                                        categoryResponses,
                                        actorResponses,
                                        directorResponses);
                }).collect(Collectors.toList());
        }

        public MovieResponse createMovie(MovieRequest request, String thumbnailUrl, String videoUrl, String poster) {

                Movies movies = new Movies();
                movies.setTitle(request.getTitle());
                movies.setDescription(request.getDescription());
                movies.setYear(request.getYear());
                movies.setTrailer(request.getTrailer());
                movies.setThumbnail(thumbnailUrl);
                movies.setPosters(poster);
                movies.setVideo(videoUrl);

                Set<Categories> categorySet = new HashSet<>(
                                categoryRepository.findAllById(request.getCategoryIds().stream()
                                                .mapToLong(i -> i)
                                                .boxed()
                                                .collect(Collectors.toList())));

                Set<Actors> actorSet = new HashSet<>(
                                actorRepository.findAllById(request.getActorsIds().stream()
                                                .mapToLong(i -> i)
                                                .boxed()
                                                .collect(Collectors.toList())));

                Set<Directors> directorSet = new HashSet<>(
                                directorRepository.findAllById(request.getDirectorsIds().stream()
                                                .mapToLong(i -> i)
                                                .boxed()
                                                .collect(Collectors.toList())));

                movies.setCategories(categorySet);
                movies.setActors(actorSet);
                movies.setDirectors(directorSet);

                String slug = SlugGenerator.generateSlug(request.getTitle());
                movies.setSlug(slug);

                Movies savedMovies = movieRepository.save(movies);

                List<CategoryResponse> categoryResponses = savedMovies.getCategories().stream()
                                .map(category -> new CategoryResponse(category.getCategoryId(),
                                                category.getCategoryName()))
                                .collect(Collectors.toList());

                List<ActorResponse> actorResponses = savedMovies.getActors().stream()
                                .map(actor -> new ActorResponse(actor.getActorId(), actor.getName(), actor.getImage(),
                                                actor.getSlug()))
                                .collect(Collectors.toList());

                List<DirectorResponse> directorResponses = savedMovies.getDirectors().stream()
                                .map(director -> new DirectorResponse(director.getDirectorId(), director.getName(),
                                                director.getImage(), director.getSlug()))
                                .collect(Collectors.toList());

                return new MovieResponse(savedMovies.getMovieId(), savedMovies.getTitle(), savedMovies.getDescription(),
                                savedMovies.getYear(), savedMovies.getTrailer(), savedMovies.getThumbnail(),
                                savedMovies.getVideo(),
                                savedMovies.getPosters(),
                                savedMovies.getSlug(),
                                categoryResponses,
                                actorResponses,
                                directorResponses);
        }

        public MovieResponse updateMovie(Long movieId, MovieRequest request,
                        String thumbnailUrl, String videoUrl, String posterUrl) {
                Movies existingMovie = movieRepository.findById(movieId)
                                .orElseThrow(() -> new FuncErrorException("Movie not found"));

                // --- Basic fields ---
                if (request.getTitle() != null)
                        existingMovie.setTitle(request.getTitle());
                if (request.getDescription() != null)
                        existingMovie.setDescription(request.getDescription());
                if (request.getYear() != null)
                        existingMovie.setYear(request.getYear());
                if (request.getTrailer() != null)
                        existingMovie.setTrailer(request.getTrailer());

                if (posterUrl != null)
                        existingMovie.setPosters(posterUrl);
                if (thumbnailUrl != null)
                        existingMovie.setThumbnail(thumbnailUrl);
                if (videoUrl != null)
                        existingMovie.setVideo(videoUrl);

                // --- Update Categories ---
                if (request.getCategoryIds() != null) {
                        if (request.getCategoryIds().isEmpty()) {
                                existingMovie.setCategories(Collections.emptySet());
                        } else {
                                Set<Categories> categories = new HashSet<>(categoryRepository.findAllById(
                                                request.getCategoryIds().stream()
                                                                .mapToLong(i -> i)
                                                                .boxed()
                                                                .collect(Collectors.toList())));
                                existingMovie.setCategories(categories);
                        }
                }

                // --- Update Actors ---
                if (request.getActorsIds() != null) {
                        if (request.getActorsIds().isEmpty()) {
                                existingMovie.setActors(Collections.emptySet());
                        } else {
                                Set<Actors> actors = new HashSet<>(actorRepository.findAllById(
                                                request.getActorsIds().stream()
                                                                .mapToLong(i -> i)
                                                                .boxed()
                                                                .collect(Collectors.toList())));
                                existingMovie.setActors(actors);
                        }
                }

                // --- Update Directors ---
                if (request.getDirectorsIds() != null) {
                        if (request.getDirectorsIds().isEmpty()) {
                                existingMovie.setDirectors(Collections.emptySet());
                        } else {
                                Set<Directors> directors = new HashSet<>(directorRepository.findAllById(
                                                request.getDirectorsIds().stream()
                                                                .mapToLong(i -> i)
                                                                .boxed()
                                                                .collect(Collectors.toList())));
                                existingMovie.setDirectors(directors);
                        }
                }

                Movies updatedMovie = movieRepository.save(existingMovie);

                // --- Mapping ke Response ---
                return new MovieResponse(
                                updatedMovie.getMovieId(),
                                updatedMovie.getTitle(),
                                updatedMovie.getDescription(),
                                updatedMovie.getYear(),
                                updatedMovie.getTrailer(),
                                updatedMovie.getThumbnail(),
                                updatedMovie.getVideo(),
                                updatedMovie.getSlug(),
                                updatedMovie.getPosters(),
                                updatedMovie.getCategories().stream()
                                                .map(c -> new CategoryResponse(c.getCategoryId(), c.getCategoryName()))
                                                .toList(),
                                updatedMovie.getActors().stream()
                                                .map(a -> new ActorResponse(a.getActorId(), a.getName(), a.getImage(),
                                                                a.getSlug()))
                                                .toList(),
                                updatedMovie.getDirectors().stream()
                                                .map(d -> new DirectorResponse(d.getDirectorId(), d.getName(),
                                                                d.getImage(), d.getSlug()))
                                                .toList());
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
