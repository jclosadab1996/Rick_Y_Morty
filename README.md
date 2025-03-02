# 🌌 Rick and Morty Explorer

![Rick and Morty Logo](https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg)

## 📱 Aplicación de Exploración del Multiverso

Esta aplicación web te permite explorar todos los personajes del universo de Rick y Morty, descubrir sus historias y navegar a través de las diferentes dimensiones.

## ✨ Características

- **Exploración de Personajes**: Navega por todos los personajes de la serie.
- **Búsqueda Avanzada**: Encuentra personajes por nombre, especie, género y estado.
- **Filtros Intuitivos**: Filtra personajes según diferentes criterios.
- **Favoritos**: Guarda tus personajes favoritos para acceder rápidamente.
- **Detalles Completos**: Visualiza información detallada de cada personaje.
- **Personajes Relacionados**: Descubre personajes que comparten ubicación.
- **Episodios**: Consulta en qué episodios aparece cada personaje.
- **Diseño Responsivo**: Experiencia óptima en dispositivos móviles y de escritorio.

## 🛠️ Tecnologías Utilizadas

- **React**: Biblioteca JavaScript para construir interfaces de usuario.
- **React Router**: Navegación entre páginas.
- **Tailwind CSS**: Framework de CSS para diseño rápido y responsivo.
- **Rick and Morty API**: API pública para obtener datos de la serie.
- **Vite**: Herramienta de construcción rápida para desarrollo moderno.
- **Vitest**: Framework de pruebas unitarias.
- **React Testing Library**: Utilidades para probar componentes React.
- **MSW (Mock Service Worker)**: Interceptor de peticiones para pruebas.

## 🚀 Instalación y Uso

### Requisitos Previos

- Node.js (versión 14 o superior)
- npm (incluido con Node.js)

### Pasos de Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tu-usuario/rick-and-morty-app.git
   cd rick-and-morty-app
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abre tu navegador en `http://localhost:5173`

## 📋 Estructura del Proyecto

```
rick-and-morty-app/
├── public/                  # Archivos estáticos
│   └── assets/              # Imágenes y recursos
├── src/                     # Código fuente
│   ├── components/          # Componentes reutilizables
│   │   ├── CharacterCard.jsx       # Tarjeta de personaje
│   │   ├── CharacterDetailModal.jsx # Modal de detalles
│   │   ├── FilterModal.jsx         # Modal de filtros
│   │   └── Footer.jsx              # Pie de página
│   ├── pages/               # Páginas de la aplicación
│   │   ├── Home.jsx         # Página principal
│   │   └── Welcome.jsx      # Página de bienvenida
│   ├── tests/               # Pruebas unitarias
│   │   ├── components/      # Pruebas de componentes
│   │   ├── pages/           # Pruebas de páginas
│   │   └── mocks/           # Mocks para pruebas
│   ├── App.jsx              # Componente principal
│   ├── main.jsx             # Punto de entrada
│   └── index.css            # Estilos globales
├── .eslintrc.js             # Configuración de ESLint
├── package.json             # Dependencias y scripts
├── tailwind.config.js       # Configuración de Tailwind CSS
└── vite.config.js           # Configuración de Vite
```

## 🧪 Pruebas

La aplicación incluye pruebas unitarias para componentes y páginas. Para ejecutar las pruebas:

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas en modo observador
npm run test:watch
```

## 🔍 Funcionalidades Detalladas

### Página de Bienvenida

- Pantalla de inicio atractiva con animación de portal.
- Botón para comenzar la aventura y explorar personajes.

### Página Principal

- Barra de búsqueda para encontrar personajes por nombre.
- Filtros avanzados por especie, género y estado.
- Visualización en cuadrícula de personajes con información básica.
- Paginación para navegar entre resultados.
- Pestañas para alternar entre todos los personajes y favoritos.

### Tarjeta de Personaje

- Imagen del personaje.
- Nombre y especie.
- Estado (vivo, muerto o desconocido).
- Última ubicación conocida.
- Botón para marcar como favorito.

### Modal de Detalles

- Información completa del personaje.
- Pestañas para alternar entre información general y episodios.
- Lista de personajes relacionados por ubicación.
- Episodios en los que aparece el personaje.

## 🌐 API Utilizada

Esta aplicación utiliza la [Rick and Morty API](https://rickandmortyapi.com/), una API REST y GraphQL que proporciona datos sobre personajes, episodios y ubicaciones de la serie.

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

## 👏 Agradecimientos

- [Rick and Morty API](https://rickandmortyapi.com/) por proporcionar los datos.
- [Adult Swim](https://www.adultswim.com/) por la increíble serie.
- [Dan Harmon y Justin Roiland](https://en.wikipedia.org/wiki/Rick_and_Morty) por crear Rick and Morty.

---

Desarrollado con ❤️ por [Tu Nombre](https://github.com/jclosadab1996
