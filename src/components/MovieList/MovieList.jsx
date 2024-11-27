import { Link, useLocation } from 'react-router-dom';
import s from './MovieList.module.css'


const MovieList = ({ movies }) => {
    const location = useLocation();
  
    return (
        <ul className={s.list}>
            {movies?.map(movie => (
                <Link  key={movie.id} to={`/movies/${movie.id.toString()}`} state={{ from: location }}>
                {movie.title || movie.original_title}
            </Link>
            ))}
        </ul>
    )
}

export default MovieList;
