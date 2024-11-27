import { useState } from 'react';
import { fetchSearchMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import s from './MoviesPage.module.css';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Обработчик отправки формы
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      console.error('Search query cannot be empty');
      return;
    }

    setLoading(true);
    setError('');
    setSuggestions([]);

    try {
      const data = await fetchSearchMovies(query);
      if (data.results && data.results.length > 0) {
        setMovies(data.results);
      } else {
        setMovies([]);
        setError('No movies found');
      }
    } catch (error) {
      setError('Something went wrong, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Обработчик изменения ввода
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetchSearchMovies(value, true);
      if (response.results) {
        setSuggestions(response.results);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  // Обработчик выбора подсказки
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.title); // Подставляем выбранное название в поле поиска
    setSuggestions([]); // Очищаем список предложений
  };

  return (
    <div className={s.container}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search movies"
        />
        <button type="submit" disabled={loading}>Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* Выпадающий список с предложениями */}
      {suggestions.length > 0 && (
        <div className={s.suggestions}>
          {suggestions.map(suggestion => (
            <div
              key={suggestion.id}
              className={s.suggestionItem}
              onClick={() => handleSuggestionClick(suggestion)} // Обработка клика
            >
              {suggestion.title}
            </div>
          ))}
        </div>
      )}

      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;

