import { useEffect, useState } from "react"
import s from './HomePage.module.css'
import { fetchTrendingMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]); 
  
  useEffect(() => {
    document.title = 'Movies | Home'
    }, []);
  
  
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchTrendingMovies('day');
        setMovies(data);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    getData();
  }, []);
  
  return (
    <div className={s.homePage}>
      <h3>
        Trending today
      </h3>
      <MovieList movies={movies} />
    </div>
  )
}

export default HomePage;
