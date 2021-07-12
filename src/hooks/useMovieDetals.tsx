import React, { useEffect, useState } from 'react'
import movieDB from '../api/movieDB';
import { MovieFull } from '../interfaces/movieInterface';
import { CreditsResponse, Cast } from '../interfaces/creditsInterface';

interface MovideDetails {
    cast?: Cast[];
    isLoading: boolean;
    movieFull?: MovieFull;
}

export const useMovieDetails = (movieId: number) => {
    const [state, setstate] = useState<MovideDetails>({
        isLoading: true,
        movieFull: undefined,
        cast: []
    });

    const getMovieDetails = async () => {
        const movieDetailsPromise = await movieDB.get<MovieFull>(`/${movieId}`);
        const castPromise = await movieDB.get<CreditsResponse>(`/${movieId}/credits`);

        const [movieDetailsResponse, castResponse] = await Promise.all([movieDetailsPromise, castPromise]);

        setstate({
            isLoading: false,
            movieFull: movieDetailsResponse.data,
            cast: castResponse.data.cast
        })
       
    }

    useEffect(() => {
        getMovieDetails();
    }, []);

    return {
        ...state
    }
}
