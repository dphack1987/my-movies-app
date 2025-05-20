import React from 'react';

type Movie = {
  id: number;
  title: string;
  year: number;
  poster: string;
};

type MovieListProps = {
  movies: Movie[];
  onEdit: (movie: Movie) => void;
  onDelete: (id: number) => void;
};

export default function MovieList({ movies, onEdit, onDelete }: MovieListProps) {
  if (movies.length === 0) {
    return <p className="no-movies">No hay películas para mostrar.</p>;
  }

  return (
    <div className="movie-list" aria-live="polite">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card" tabIndex={0} aria-label={`Película: ${movie.title}, año ${movie.year}`}>
          <img src={movie.poster} alt={`Póster de ${movie.title}`} className="movie-poster" loading="lazy" />
          <div className="movie-info">
            <div>
              <div className="movie-title">{movie.title}</div>
              <div className="movie-year">{movie.year}</div>
            </div>
            <div className="movie-actions">
              <button onClick={() => onEdit(movie)} aria-label={`Editar película ${movie.title}`}>
                Editar
              </button>
              <button onClick={() => {
                if (window.confirm(`¿Eliminar la película "${movie.title}"?`)) {
                  onDelete(movie.id);
                }
              }} aria-label={`Eliminar película ${movie.title}`}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
