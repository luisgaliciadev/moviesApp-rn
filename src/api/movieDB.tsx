import axios from 'axios';

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: 'a3044af7784803d8f83ebf4fcd9057d9',
        language: 'es-ES',
    }
});

export default movieDB;

// freelea.pe