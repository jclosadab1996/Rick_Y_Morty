import { useState, useEffect } from 'react'
import { FaSearch, FaFilter, FaHeart, FaRegHeart, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import CharacterCard from '../components/CharacterCard'
import FilterModal from '../components/FilterModal'
import CharacterDetailModal from '../components/CharacterDetailModal'
import Footer from '../components/Footer'

const Home = () => {
  const [characters, setCharacters] = useState([])
  const [filteredCharacters, setFilteredCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState('todos')
  const [favorites, setFavorites] = useState([])
  const [totalCharacters, setTotalCharacters] = useState(0)
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  
  // Character detail modal
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  
  // Filter states
  const [filters, setFilters] = useState({
    species: '',
    gender: '',
    status: ''
  })

  // Construir URL con parámetros de filtro
  const buildApiUrl = () => {
    let url = `https://rickandmortyapi.com/api/character?page=${currentPage}`;
    
    if (filters.species) {
      url += `&species=${filters.species}`;
    }
    
    if (filters.gender) {
      url += `&gender=${filters.gender}`;
    }
    
    if (filters.status) {
      url += `&status=${filters.status}`;
    }
    
    if (searchTerm) {
      url += `&name=${searchTerm}`;
    }
    
    return url;
  };

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      const url = buildApiUrl();
      const response = await fetch(url);
      
      if (!response.ok) {
        if (response.status === 404) {
          // No se encontraron resultados con los filtros aplicados
          setCharacters([]);
          setFilteredCharacters([]);
          setTotalCharacters(0);
          setTotalPages(0);
          setLoading(false);
          return;
        }
        throw new Error('Error en la respuesta de la API');
      }
      
      const data = await response.json();
      setCharacters(data.results);
      setFilteredCharacters(data.results);
      setTotalCharacters(data.info.count);
      setTotalPages(data.info.pages);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar los personajes');
      console.error(err);
      setLoading(false);
    }
  };

  // Cargar personajes al inicio y cuando cambian los filtros
  useEffect(() => {
    fetchCharacters();
    
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, [currentPage, filters, searchTerm]);

  // Filtrar favoritos localmente
  useEffect(() => {
    if (activeTab === 'favoritos') {
      const favoritedCharacters = characters.filter(character => 
        favorites.includes(character.id)
      );
      setFilteredCharacters(favoritedCharacters);
    } else {
      setFilteredCharacters(characters);
    }
  }, [activeTab, characters, favorites]);

  const toggleFavorite = (id) => {
    let newFavorites;
    if (favorites.includes(id)) {
      newFavorites = favorites.filter(favId => favId !== id);
    } else {
      newFavorites = [...favorites, id];
    }
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Resetear a la primera página al aplicar nuevos filtros
    setShowFilters(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Resetear a la primera página al buscar
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'todos') {
      fetchCharacters();
    }
  };

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  };
  
  const handleRelatedCharacterClick = (relatedCharacter) => {
    setSelectedCharacter(relatedCharacter);
  };

  return (
    <div className="min-h-screen bg-rick-light flex flex-col">
      {/* Header with background image */}
      <div className="relative h-48 bg-black">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{ 
            backgroundImage: "url('/assets/portal-background.jpg')"
          }}
        />
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg" 
            alt="Rick and Morty Logo" 
            className="h-16 mb-4"
          />
          
          <div className="w-full max-w-2xl relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar personaje por nombre"
              className="search-input"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-6 flex-grow">
        {/* Tabs and filter button */}
        <div className="flex justify-between items-center mb-6">
          <div className="bg-gray-200 p-1 rounded-full inline-flex">
            <button 
              className={`tab-button-new ${activeTab === 'todos' ? 'active' : ''}`}
              onClick={() => handleTabChange('todos')}
            >
              Todos
            </button>
            <button 
              className={`tab-button-new ${activeTab === 'favoritos' ? 'active' : ''}`}
              onClick={() => handleTabChange('favoritos')}
            >
              Favoritos
            </button>
          </div>
          
          <div className="flex items-center">
            <div className="text-gray-700 font-bold mr-4 text-right">
              <span>{totalCharacters}</span> personajes
            </div>
            <button 
              className="flex items-center bg-white p-2 rounded-full shadow text-gray-700 hover:bg-gray-100"
              onClick={() => setShowFilters(true)}
            >
              <FaFilter />
            </button>
          </div>
        </div>

        {/* Loading and error states */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rick-green"></div>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-center py-8">
            {error}
          </div>
        )}

        {/* Character grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCharacters.map(character => (
              <div 
                key={character.id} 
                onClick={() => handleCharacterClick(character)}
                className="cursor-pointer h-full"
              >
                <CharacterCard 
                  character={character} 
                  isFavorite={favorites.includes(character.id)}
                  toggleFavorite={(id) => {
                    // Prevent the card click when clicking the favorite button
                    event.stopPropagation();
                    toggleFavorite(id);
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* No results message */}
        {!loading && !error && filteredCharacters.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-xl">No se encontraron personajes con los filtros seleccionados</p>
            {(filters.species || filters.gender || filters.status || searchTerm) && (
              <button 
                onClick={() => {
                  setFilters({ species: '', gender: '', status: '' });
                  setSearchTerm('');
                  setCurrentPage(1);
                }}
                className="mt-4 bg-rick-green text-white px-4 py-2 rounded-full hover:bg-opacity-90"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && activeTab !== 'favoritos' && filteredCharacters.length > 0 && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-4">
              <button 
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-full ${currentPage === 1 ? 'bg-gray-200 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                <FaChevronLeft />
              </button>
              
              <span className="text-gray-700">
                Página {currentPage} de {totalPages}
              </span>
              
              <button 
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-full ${currentPage === totalPages ? 'bg-gray-200 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />

      {/* Filter modal */}
      {showFilters && (
        <FilterModal 
          currentFilters={filters} 
          onClose={() => setShowFilters(false)} 
          onApply={applyFilters}
        />
      )}

      {/* Character detail modal */}
      {selectedCharacter && (
        <CharacterDetailModal 
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
          isFavorite={favorites.includes(selectedCharacter.id)}
          toggleFavorite={toggleFavorite}
          onSelectRelatedCharacter={handleRelatedCharacterClick}
        />
      )}
    </div>
  )
}

export default Home