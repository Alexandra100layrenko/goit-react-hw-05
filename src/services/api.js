import axios from 'axios';


axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const API_KEY ='f7e6c36c22b45f3787820b9768c6f29a';
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmN2U2YzM2YzIyYjQ1ZjM3ODc4MjBiOTc2OGM2ZjI5YSIsIm5iZiI6MTczMjM3ODk1OC45MzMzMzgsInN1YiI6IjY3NDFmYmY1ZjBmMmVkOGY5ODUyMTEyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1J-N0KUi0Ci1VtxFxR3LYWQnVhiICjELX7EZdMoK9H4';

const headers = {
    Authorization: `Bearer ${API_TOKEN}`,
};


export const fetchTrendingMovies = async (timeWindow = 'day') =>{
    const {data} = await axios.get(`/trending/movie/${timeWindow}`, { headers })
    return data.results;
}

export const fetchMovieList = async () => {
    const { data } = await axios.get(`/trending/movie/day?api_key=${API_KEY}`, { headers });
    return data.results;
};

export const fetchMovieDetails = async (movieId) => {
    try {
      const { data } = await axios.get(`/movie/${movieId}`, {
        headers,
        params: { language: 'en-US' },
      });
      return data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  };

export const fetchSearchMovies = async (query, isSuggestions = false) => {
    try {
      const { data } = await axios.get('/search/movie', {
        headers,
        params: {
          query,
          language: 'en-US',
          include_adult: false,
          page: 1,
          ...(isSuggestions && { query: `${query}*` }),
        },
      });
      return data;
    } catch (error) {
      console.error('Error when searching for movies:', error);
      throw error;
    }
};


export const fetchMovieCast = async (movieId) =>{
    const {data} = await axios.get(`/movie/${movieId}/credits`, { headers })
    return data.cast;
}

export const fetchMovieReviews = async (movieId) =>{
    const {data} = await axios.get(`/movie/${movieId}/reviews`, { headers })
    return data.results;
}


/*export const fetchMovieCast = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}/credits`, { headers });
    return data;
};

export const fetchMovieReviews = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}/reviews`, { headers });
    return data;
};*/