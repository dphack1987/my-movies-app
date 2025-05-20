import React, { useState, FormEvent } from 'react';

type MovieFormProps = {
  onSubmit: (movie: Omit<Movie, 'id'>) => void;
  initialData?: Omit<Movie, 'id'>;
  onCancel?: () => void;
  isEditing?: boolean;
};

type Movie = {
  id: number;
  title: string;
  year: number;
  poster: string;
};

export default function MovieForm({ onSubmit, initialData, onCancel, isEditing = false }: MovieFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [year, setYear] = useState(initialData?.year.toString() ?? '');
  const [poster, setPoster] = useState(initialData?.poster ?? '');
  const [errors, setErrors] = useState<{ title?: string; year?: string; poster?: string }>({});

  const validate = (): boolean => {
    const errs: typeof errors = {};
    if (!title.trim()) errs.title = 'El título es obligatorio.';
    if (!year.trim()) {
      errs.year = 'El año es obligatorio.';
    } else if (!/^\d{4}$/.test(year.trim())) {
      errs.year = 'El año debe ser un número de 4 dígitos.';
    } else {
      const yearNum = parseInt(year, 10);
      if (yearNum < 1888 || yearNum > new Date().getFullYear() + 5) {
        errs.year = 'El año debe ser lógico (1888 hasta 5 años en el futuro).';
      }
    }
    if (!poster.trim()) {
      errs.poster = 'La URL del póster es obligatoria.';
    } else {
      try {
        new URL(poster);
      } catch {
        errs.poster = 'La URL del póster no es válida.';
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        title: title.trim(),
        year: parseInt(year, 10),
        poster: poster.trim(),
      });
      if (!isEditing) {
        setTitle('');
        setYear('');
        setPoster('');
        setErrors({});
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label={isEditing ? 'Editar película' : 'Agregar nueva película'} className="movie-form">
      <div className="input-group">
        <label htmlFor="titleInput">Título</label>
        <input
          id="titleInput"
          type="text"
          placeholder="Ej: El Padrino"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? 'titleError' : undefined}
          required
        />
        {errors.title && <div className="error" id="titleError">{errors.title}</div>}
      </div>

      <div className="input-group">
        <label htmlFor="yearInput">Año</label>
        <input
          id="yearInput"
          type="number"
          min={1888}
          max={new Date().getFullYear() + 5}
          placeholder="Ej: 1972"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          aria-invalid={!!errors.year}
          aria-describedby={errors.year ? 'yearError' : undefined}
          required
        />
        {errors.year && <div className="error" id="yearError">{errors.year}</div>}
      </div>

      <div className="input-group full-width">
        <label htmlFor="posterInput">URL de Póster</label>
        <input
          id="posterInput"
          type="url"
          placeholder="Ej: https://ejemplo.com/poster.jpg"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
          aria-invalid={!!errors.poster}
          aria-describedby={errors.poster ? 'posterError' : undefined}
          required
        />
        {errors.poster && <div className="error" id="posterError">{errors.poster}</div>}
      </div>

      <div className="form-buttons">
        <button type="submit" aria-label={isEditing ? 'Guardar cambios' : 'Agregar película'}>
          {isEditing ? 'Guardar' : 'Agregar'}
        </button>
        {isEditing && onCancel && (
          <button type="button" className="btn-secondary" onClick={onCancel} aria-label="Cancelar edición">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
