package DumbFlix.DumbFlix_BE.service;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
        private final SubcriptionService subscriptionService;
        private final CategoryRepository categoryRepository;
        private final ActorRepository actorRepository;
        private final DirectorRepository directorRepository;

        @Autowired
        public MovieService(MovieRepository movieRepository, CategoryRepository categoryRepository,
                        SubcriptionService subscriptionService, ActorRepository actorRepository,
                        DirectorRepository directorRepository) {
                this.movieRepository = movieRepository;
                this.subscriptionService = subscriptionService;
                this.categoryRepository = categoryRepository;
                this.actorRepository = actorRepository;
                this.directorRepository = directorRepository;
        }

        @Cacheable(value = "allMoviesCache", key = "'allMovies'")
        public List<MovieResponse> getAllMovies() {
                List<Movies> movies = movieRepository.findAll();

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

                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                String fullName = null;

                if (authentication != null && authentication.isAuthenticated()) {
                        fullName = authentication.getName();
                }

                boolean isSubscribed = false;
                if (fullName != null) {
                        isSubscribed = subscriptionService.isUserSubscribed(fullName);
                }

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

                String videoUrl = isSubscribed ? movie.getVideo() : null;

                return new MovieResponse(movie.getMovieId(), movie.getTitle(),
                                movie.getDescription(),
                                movie.getYear(), movie.getTrailer(), movie.getThumbnail(),
                                videoUrl,
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

                List<Long> categoryIds = request.getCategoryIds().stream()
                                .map(Integer::longValue)
                                .collect(Collectors.toList());
                List<Categories> categories = categoryRepository.findAllById(categoryIds);

                List<Long> actorIds = request.getActorsIds().stream().map(Integer::longValue)
                                .collect(Collectors.toList());
                List<Actors> actors = actorRepository.findAllById(actorIds);

                List<Long> directorIds = request.getDirectorsIds().stream().map(Integer::longValue)
                                .collect(Collectors.toList());
                List<Directors> directors = directorRepository.findAllById(directorIds);

                Movies movies = new Movies();
                movies.setTitle(request.getTitle());
                movies.setDescription(request.getDescription());
                movies.setYear(request.getYear());
                movies.setTrailer(request.getTrailer());
                movies.setThumbnail(thumbnailUrl);
                movies.setPosters(poster);
                movies.setVideo(videoUrl);
                movies.setCategories(categories);
                movies.setActors(actors);
                movies.setDirectors(directors);

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

        public MovieResponse updateMovie(Long movieId, MovieRequest request, String thumbnailUrl, String videoUrl,
                        String posterUrl) {
                try {
                        Movies existingMovie = movieRepository.findById(movieId)
                                        .orElseThrow(() -> new FuncErrorException("Movie not found"));

                        // Basic fields
                        existingMovie.setTitle(
                                        request.getTitle() != null ? request.getTitle() : existingMovie.getTitle());
                        existingMovie.setDescription(request.getDescription() != null ? request.getDescription()
                                        : existingMovie.getDescription());
                        existingMovie.setYear(request.getYear() != null ? request.getYear() : existingMovie.getYear());
                        existingMovie.setTrailer(request.getTrailer() != null ? request.getTrailer()
                                        : existingMovie.getTrailer());

                        if (posterUrl != null)
                                existingMovie.setPosters(posterUrl);
                        if (thumbnailUrl != null)
                                existingMovie.setThumbnail(thumbnailUrl);
                        if (videoUrl != null)
                                existingMovie.setVideo(videoUrl);

                        // Update Categories
                        if (request.getCategoryIds() != null) {
                                if (request.getCategoryIds().isEmpty()) {
                                        existingMovie.setCategories(Collections.emptyList());
                                } else {
                                        List<Long> categoryIds = request.getCategoryIds().stream()
                                                        .map(Integer::longValue)
                                                        .collect(Collectors.toList());

                                        List<Categories> categories = categoryRepository.findAllById(categoryIds);

                                        // Buat kategori baru kalau ID tidak ditemukan
                                        if (categories.size() < categoryIds.size()) {
                                                List<Long> foundIds = categories.stream().map(Categories::getCategoryId)
                                                                .toList();
                                                List<Long> newIds = categoryIds.stream()
                                                                .filter(id -> !foundIds.contains(id)).toList();
                                                for (Long id : newIds) {
                                                        Categories newCat = new Categories();
                                                        newCat.setCategoryId(id); // atau auto-generate
                                                        newCat.setCategoryName("New Category " + id);
                                                        categories.add(categoryRepository.save(newCat));
                                                }
                                        }

                                        existingMovie.setCategories(categories);
                                }
                        }

                        // Update Actors
                        if (request.getActorsIds() != null) {
                                if (request.getActorsIds().isEmpty()) {
                                        existingMovie.setActors(Collections.emptyList());
                                } else {
                                        List<Long> actorIds = request.getActorsIds().stream()
                                                        .map(Integer::longValue)
                                                        .collect(Collectors.toList());

                                        List<Actors> actors = actorRepository.findAllById(actorIds);

                                        // Buat actor baru kalau ID tidak ditemukan
                                        if (actors.size() < actorIds.size()) {
                                                List<Long> foundIds = actors.stream().map(Actors::getActorId).toList();
                                                List<Long> newIds = actorIds.stream()
                                                                .filter(id -> !foundIds.contains(id)).toList();
                                                for (Long id : newIds) {
                                                        Actors newActor = new Actors();
                                                        newActor.setActorId(id); // atau auto-generate
                                                        newActor.setName("New Actor " + id);
                                                        actors.add(actorRepository.save(newActor));
                                                }
                                        }

                                        existingMovie.setActors(actors);
                                }
                        }

                        // Update Directors
                        if (request.getDirectorsIds() != null) {
                                if (request.getDirectorsIds().isEmpty()) {
                                        existingMovie.setDirectors(Collections.emptyList());
                                } else {
                                        List<Long> directorIds = request.getDirectorsIds().stream()
                                                        .map(Integer::longValue)
                                                        .collect(Collectors.toList());

                                        List<Directors> directors = directorRepository.findAllById(directorIds);

                                        // Buat director baru kalau ID tidak ditemukan
                                        if (directors.size() < directorIds.size()) {
                                                List<Long> foundIds = directors.stream().map(Directors::getDirectorId)
                                                                .toList();
                                                List<Long> newIds = directorIds.stream()
                                                                .filter(id -> !foundIds.contains(id)).toList();
                                                for (Long id : newIds) {
                                                        Directors newDirector = new Directors();
                                                        newDirector.setDirectorId(id); // atau auto-generate
                                                        newDirector.setName("New Director " + id);
                                                        directors.add(directorRepository.save(newDirector));
                                                }
                                        }

                                        existingMovie.setDirectors(directors);
                                }
                        }

                        Movies updatedMovie = movieRepository.save(existingMovie);

                        // Mapping to Response
                        List<CategoryResponse> categoryResponses = updatedMovie.getCategories().stream()
                                        .map(c -> new CategoryResponse(c.getCategoryId(), c.getCategoryName()))
                                        .collect(Collectors.toList());
                        List<ActorResponse> actorResponses = updatedMovie.getActors().stream()
                                        .map(a -> new ActorResponse(a.getActorId(), a.getName(), a.getImage(),
                                                        a.getSlug()))
                                        .collect(Collectors.toList());
                        List<DirectorResponse> directorResponses = updatedMovie.getDirectors().stream()
                                        .map(d -> new DirectorResponse(d.getDirectorId(), d.getName(), d.getImage(),
                                                        d.getSlug()))
                                        .collect(Collectors.toList());

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
                                        categoryResponses,
                                        actorResponses,
                                        directorResponses);

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
