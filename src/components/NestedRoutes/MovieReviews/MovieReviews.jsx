import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../../services/api';
import s from './MovieReviews.module.css';
import { useEffect, useState } from 'react';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReviews = async () => {
        try {
            const reviewData = await fetchMovieReviews(movieId);
            if (!reviewData || !Array.isArray(reviewData)) {
                throw new Error("Invalid data format: Review data is not an array.");
            }
            setReviews(reviewData);
        } catch (error) {
            console.error("Error fetching movie reviews:", error.message);
            setError(error.message);
        }
      };

    getReviews();
    }, [movieId]);

  if (error) {
    return <p className={s.errorMessage}>Failed to load reviews: {error}</p>;
  }

  return (
    <div className={s.reviews}>
        {reviews.length > 0 ? (
            reviews.map(review => (
                <div key={review.id}>
                    <h4>{review.author || 'Anonymous'}</h4>
                    <p>{review.content || 'No review content provided.'}</p>
                </div>
            ))
        ) : (
            <p>No reviews available for this movie.</p>
        )}
    </div>
  );
};

export default MovieReviews;
