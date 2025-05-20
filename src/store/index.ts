import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import categoryReducer from "./category/slice";
import movieReducer from "./movie/slice";
import seasonReducer from "./season/slice";
import seriesReducer from "./series/slice";
import episodeReducer from "./episode/slice";
import { useDispatch, useSelector } from 'react-redux';

const store = configureStore({
    reducer: {
        auth: authReducer,
        movie: movieReducer,
        category: categoryReducer,
        season: seasonReducer,
        series: seriesReducer,
        episode: episodeReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store