import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../../services/api';
import s from './MovieCast.module.css';
import { useEffect, useState } from 'react';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCast = async () => {
        try {
            const castData = await fetchMovieCast(movieId);
            if (!castData || !Array.isArray(castData)) {
                throw new Error("Invalid data format: Cast data is not an array.");
            }
            setCast(castData);
        } catch (error) {
            console.error("Error fetching movie cast:", error.message);
            setError(error.message);
        }
    };

    getCast();
}, [movieId]);

  if (error) {
    return <p className={s.errorMessage}>Failed to load cast: {error}</p>;
  }

  return (
    <ul className={s.castList}>
    {cast.length > 0 ? (
        cast.map(actor => (
            <li key={actor.id}>
                <img
                    src={
                        actor.profile_path
                            ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                            : 'https://via.placeholder.com/200x300?text=No+Image'
                    }
                    alt={actor.name || 'Unknown Actor'}
                />
                <p>{actor.name || 'Unknown Actor'}</p>
                <p>Character: {actor.character || 'N/A'}</p>
            </li>
        ))
    ) : (
        <p>No cast information available.</p>
    )}
</ul>
  );
};

export default MovieCast;