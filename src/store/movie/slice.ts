import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovie } from "../../types/movie";
import {
  createMovie,
  getMovieByName,
  getMovieBySlug,
  getMovies,
} from "./async";

interface movieState {
  movies: IMovie[];
  loading: boolean;
  detailMovie: IMovie | null;
  error: string | null;
}

const initialState: movieState = {
  movies: [],
  loading: false,
  detailMovie: null,
  error: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get movies
    builder
      .addCase(getMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })

      .addCase(getMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // get movie by name
    builder
      .addCase(getMovieByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMovieByName.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = Array.isArray(action.payload)
          ? action.payload
          : [action.payload];
      })
      .addCase(getMovieByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getMovieBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMovieBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.detailMovie = action.payload;
      })
      .addCase(getMovieBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // create movie
    builder
      .addCase(createMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createMovie.fulfilled,
        (state, action: PayloadAction<IMovie>) => {
          state.movies.push(action.payload);
          state.loading = false;
        }
      )
      .addCase(createMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default movieSlice.reducer;
