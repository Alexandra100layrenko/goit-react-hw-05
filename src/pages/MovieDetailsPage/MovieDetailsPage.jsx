import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../../services/api';
import s from './MovieDetailsPage.module.css'

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      }
    };
    getData();
  }, [movieId]);

  if (!movie) {
    return <h3>Loading....</h3>;
  }

  const { title, overview, poster_path, vote_average } = movie;

  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w300${poster_path}`
    : 'path/to/default/image.jpg';
    
  return (
    <div className={s.wraper}>
      <Link to={location.state?.from || '/movies'} className={s.btn}>Go back</Link>
      <div className={s.details}>
      <img src={posterUrl} alt={title} />
        <div className={s.description}>
          <h2>{title} ({movie.id} )</h2>
          <p className={s.text}>User Score: {vote_average * 10}%</p>
          <h3>Overview</h3>
          <p className={s.text}>{overview}</p>
        </div>
      </div>
      <hr />
      <div className={s.additional}>
        <h3>Additional Information</h3>
        <nav>
          <Link className={s.navLink} to="cast" state={{ from: location.state?.from }}>
            Cast
          </Link>
          <Link className={s.navLink}  to="reviews" state={{ from: location.state?.from }}>
            Reviews
          </Link>
        </nav>
      </div>
      <Outlet />
      <hr />
    </div>
  );
};

export default MovieDetailsPage;
