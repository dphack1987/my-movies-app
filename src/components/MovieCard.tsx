import React from 'react';

type Movie = {
  id: number;
  title: string;
  year: number;
  poster: string;
};

type MovieCardProps = {
  movie: Movie;
  onEdit: (movie: Movie) => void;
  onDelete: (id: number) => void;
};

const MovieCard = ({ movie, onEdit, onDelete }: MovieCardProps) => (
  <article className="movie-card" tabIndex={0} aria-label={`Película: ${movie.title}, año ${movie.year}`}>
    <img
      src={movie.poster}
      alt={`Póster de la película ${movie.title}`}
      className="movie-poster"
      loading="lazy"
      onError={(e) => {
        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x300?text=No+Image';
      }}
    />
    <div className="movie-info">
      <h2 className="movie-title">{movie.title}</h2>
      <p className="movie-year">{movie.year}</p>
      <div className="movie-actions">
        <button onClick={() => onEdit(movie)} aria-label={`Editar película ${movie.title}`}>
          Editar
        </button>
        <button
          onClick={() => {
            if (window.confirm(`¿Seguro que quieres eliminar la película "${movie.title}"?`)) {
              onDelete(movie.id);
            }
          }}
          className="btn-secondary"
          aria-label={`Eliminar película ${movie.title}`}
        >
          Eliminar
        </button>
      </div>
    </div>
  </article>
);

export default MovieCard;
