
# Aplicación de Mis Películas Favoritas

## Descripción
Esta aplicación es un administrador de películas favoritas, que permite visualizar, agregar, editar, eliminar y ordenar películas por título o año. Además, cuenta con una búsqueda en tiempo real para filtrar las películas mostradas. El diseño está inspirado en el estilo moderno y atractivo de plataformas como Netflix, con un tema oscuro y una interfaz responsiva y accesible.

## Decisiones Técnicas Clave

- **React con TypeScript:** Se eligió React por su flexibilidad y popularidad para construir interfaces reactivas y TypeScript para garantizar tipado estático y mejor mantenimiento del código.
- **Componentización:** La app está dividida en componentes reutilizables (`MovieForm`, `MovieList`, `MovieCard`) para facilitar la organización, escalabilidad y testeo.
- **LocalStorage para persistencia:** Se usa localStorage para guardar la lista de películas localmente evitando la necesidad de backend y permitiendo persistencia entre sesiones.
- **Estilos CSS modernos e inspirados en Netflix:** Diseño oscuro, tipografía legible (Poppins), tarjetas con efectos hover sutiles, scroll horizontal tipo carrusel y layout responsive.
- **Validación y manejo de errores:** El formulario valida campos obligatorios y formatos para mejorar la experiencia de usuario.
- **Accesibilidad:** Uso de atributos ARIA, roles semánticos y buen manejo del foco para mejorar la usabilidad para todos.

## Qué Mejoraría con Más Tiempo

- **Backend y API:** Añadir base de datos y backend para persistencia real y multiusuario.
- **Internacionalización (i18n):** Soporte para múltiples idiomas con cambio en tiempo real.
- **Animaciones más avanzadas:** Usar librerías para transiciones suaves y efectos enriquecidos.
- **Tests automatizados:** Pruebas unitarias e integración para asegurar calidad y fiabilidad.
- **Modo oscuro/claro toggle:** Permitir al usuario elegir tema visual.
- **Filtro avanzado:** Filtrar por género, año, calificación u otros.
- **Mejor optimización y accesibilidad:** Auditorías y mejoras continuas.

## Cómo Ejecutar el Proyecto Localmente

### Requisitos

- Node.js y npm o yarn instalados.

### Pasos

1. Clonar el repositorio o descargar el código.
2. Entrar a la carpeta del proyecto en terminal.
3. Instalar las dependencias:
