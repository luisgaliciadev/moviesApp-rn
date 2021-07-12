import React, { useEffect, useState } from 'react'
import movieDB from '../api/movieDB';
import { MoviesResponse, Movie } from '../interfaces/movieInterface';

interface MoviesState {
    nowPlaying: Movie[];
    popular: Movie[];
    topRated: Movie[];
    upComing: Movie[];
}

export const useMovies = () => {

    const [moviesState, setMoviesState] = useState<MoviesState>({
        nowPlaying: [],
        popular: [],
        topRated: [],
        upComing: []
    });
    const [isLoading, setIsLoading] = useState(true);

    const getMovies = async() => {
        const nowPlayingPromise = movieDB.get<MoviesResponse>('/now_playing');
        const popularPromise = movieDB.get<MoviesResponse>('/popular');
        const topRatedPromise = movieDB.get<MoviesResponse>('/top_rated');
        const upComingPromise = movieDB.get<MoviesResponse>('/upcoming');

        const response = await Promise.all([nowPlayingPromise, popularPromise, topRatedPromise, upComingPromise]);
        
        setMoviesState({
            nowPlaying: response[0].data.results,
            popular: response[1].data.results,
            topRated: response[2].data.results,
            upComing: response[3].data.results,
        });
        
        setIsLoading(false);
    }

    useEffect(() => {
       getMovies();
    }, [])
 
    return {
        ...moviesState,
        isLoading
    }
}
