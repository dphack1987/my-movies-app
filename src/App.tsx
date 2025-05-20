import React, { useState, useEffect, useRef } from 'react';
import MovieForm from './components/MovieForm';
import MovieList from './components/MovieList';

type Movie = {
  id: number;
  title: string;
  year: number;
  poster: string;
};

type SortOption = 'alphabetical' | 'year';

const LS_KEY = 'favorite-movies';

const initialMovies: Movie[] = [
  // tu lista de películas
];

export default function App() {
  const [movies, setMovies] = useState<Movie[]>(() => {
    const stored = localStorage.getItem(LS_KEY);
    if(stored) {
      try {return JSON.parse(stored) as Movie[]} catch { return initialMovies;}
    }
    return initialMovies;
  });

  const nextIdRef = useRef(movies.length > 0 ? Math.max(...movies.map(m => m.id)) + 1 : 1);
  
  const [sortOption, setSortOption] = useState<SortOption>('alphabetical');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingMovie, setEditingMovie] = useState<Movie|null>(null);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(movies));
  }, [movies]);

  const filteredSortedMovies = movies
    .filter(m => m.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a,b) => 
      sortOption==='alphabetical' ? a.title.localeCompare(b.title) : a.year - b.year
    );

  const addMovie = (movieData: Omit<Movie,'id'>) => {
    setMovies(prev => [...prev, {...movieData, id: nextIdRef.current++}]);
  };
  const updateMovie = (movieData: Omit<Movie,'id'>) => {
    if(!editingMovie) return;
    setMovies(prev => prev.map(m => m.id===editingMovie.id ? {...movieData,id:editingMovie.id}:m));
    setEditingMovie(null);
  };
  const deleteMovie = (id:number) => {
    setMovies(prev => prev.filter(m => m.id !== id));
    if(editingMovie?.id === id) setEditingMovie(null);
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
      <style>{`
        body,html,#root {
          height:100%;
          margin:0;
          background:#141414;
          font-family: 'Montserrat', sans-serif;
          color:white;
          overflow-x:hidden;
        }
        .app-container {
          min-height:100vh;
          padding: 20px 40px 40px;
          display:flex;
          flex-direction:column;
          background: linear-gradient(180deg, #141414 0%, #00000090 100%);
        }
        h1 {
          font-weight: 700;
          font-size: 2.8rem;
          color: #E50914;
          margin-bottom: 24px;
          user-select:none;
        }
        .controls {
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:16px;
          gap: 12px;
          flex-wrap: wrap;
        }
        input[type="search"] {
          flex-grow:1;
          min-width:220px;
          padding:8px 14px;
          font-size:1rem;
          border-radius:4px;
          border:none;
          outline:none;
          color:#333;
        }
        select {
          background:#e50914;
          border:none;
          color:white;
          padding:8px 14px;
          border-radius:4px;
          cursor:pointer;
          font-weight:700;
          user-select:none;
        }
        /* Movie carousel */
        .movie-list {
          display:flex;
          overflow-x:auto;
          padding-bottom:20px;
          gap: 16px;
          scroll-behavior:smooth;
        }
        .movie-list::-webkit-scrollbar {
          height:8px;
        }
        .movie-list::-webkit-scrollbar-thumb {
          background:#e50914bb;
          border-radius:4px;
        }
        .movie-card {
          min-width:180px;
          flex-shrink:0;
          border-radius:8px;
          overflow:hidden;
          background:#222;
          box-shadow: 0 2px 8px rgba(0,0,0,0.8);
          transition:transform 0.3s ease;
          cursor:pointer;
          display:flex;
          flex-direction:column;
        }
        .movie-card:hover {
          transform:scale(1.1);
          box-shadow: 0 8px 20px rgba(229,9,20,0.7);
          z-index:10;
        }
        .movie-poster {
          width:100%;
          height:270px;
          object-fit:cover;
          background:#444;
          border-bottom:1px solid #e50914;
        }
        .movie-info {
          padding: 8px 12px;
          color:#eee;
          display:flex;
          flex-direction:column;
          flex-grow:1;
          justify-content:space-between;
        }
        .movie-title {
          font-size:1.1rem;
          font-weight:700;
          margin-bottom:4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .movie-year {
          font-size:0.9rem;
          color:#bbb;
        }
        .movie-actions {
          display: flex;
          gap: 8px;
          margin-top: 8px;
          justify-content: center;
        }
        .movie-actions button {
          background:#e50914;
          border:none;
          padding:6px 10px;
          border-radius:4px;
          color:white;
          font-weight:600;
          cursor:pointer;
          transition: background-color 0.3s ease;
        }
        .movie-actions button:hover {
          background:#b00610;
        }
        /* Responsive */
        @media(max-width: 600px) {
          h1 {
            font-size: 2rem;
          }
          .movie-card {
            min-width: 140px;
          }
          .movie-poster {
            height: 210px;
          }
          .movie-title {
            font-size: 1rem;
          }
        }
      `}</style>

      <div className="app-container" role="main" aria-label="Aplicación de mis películas favoritas">
        <h1>APLICACIÓN DE MIS PELÍCULAS FAVORITAS</h1>

        {!editingMovie && <MovieForm onSubmit={addMovie} />}

        {editingMovie && (
          <MovieForm
            initialData={{ title: editingMovie.title, year: editingMovie.year, poster: editingMovie.poster }}
            onSubmit={updateMovie}
            onCancel={() => setEditingMovie(null)}
            isEditing
          />
        )}

        <div className="controls">
          <input
            type="search"
            placeholder="Buscar películas..."
            aria-label="Buscar películas"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            aria-label="Seleccionar orden de películas"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
          >
            <option value="alphabetical">Alfabéticamente</option>
            <option value="year">Por año</option>
          </select>
        </div>

        <div className="movie-list" aria-live="polite">
          {filteredSortedMovies.length === 0 ? (
            <p>No hay películas para mostrar.</p>
          ) : (
            filteredSortedMovies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img src={movie.poster} alt={`Póster de ${movie.title}`} className="movie-poster" loading="lazy" />
                <div className="movie-info">
                  <div>
                    <div className="movie-title">{movie.title}</div>
                    <div className="movie-year">{movie.year}</div>
                  </div>
                  <div className="movie-actions">
                    <button onClick={() => setEditingMovie(movie)} aria-label={`Editar película ${movie.title}`}>
                      Editar
                    </button>
                    <button onClick={() => {
                      if(window.confirm(`¿Eliminar ${movie.title}?`)) deleteMovie(movie.id);
                    }} aria-label={`Eliminar película ${movie.title}`}>
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
