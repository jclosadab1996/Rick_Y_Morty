import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'

const FilterModal = ({ currentFilters, onClose, onApply }) => {
  const [filters, setFilters] = useState(currentFilters)

  const handleSpeciesChange = (species) => {
    setFilters(prev => ({
      ...prev,
      species: prev.species === species ? '' : species
    }))
  }

  const handleGenderChange = (gender) => {
    setFilters(prev => ({
      ...prev,
      gender: prev.gender === gender ? '' : gender
    }))
  }

  const handleStatusChange = (status) => {
    setFilters(prev => ({
      ...prev,
      status: prev.status === status ? '' : status
    }))
  }

  const clearAllFilters = () => {
    setFilters({
      species: '',
      gender: '',
      status: ''
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 overflow-y-auto pt-10 pb-10">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 relative">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Filtros avanzados</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>
        
        <div className="p-4">
          {/* Species filter */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Especie</h3>
            <div className="flex flex-wrap gap-2">
              <button 
                className={`filter-pill ${filters.species === 'Human' ? 'active' : ''}`}
                onClick={() => handleSpeciesChange('Human')}
              >
                Humano
              </button>
              <button 
                className={`filter-pill ${filters.species === 'Alien' ? 'active' : ''}`}
                onClick={() => handleSpeciesChange('Alien')}
              >
                Alien
              </button>
              <button 
                className={`filter-pill ${filters.species === 'Humanoid' ? 'active' : ''}`}
                onClick={() => handleSpeciesChange('Humanoid')}
              >
                Humanoide
              </button>
              <button 
                className={`filter-pill ${filters.species === 'Poopybutthole' ? 'active' : ''}`}
                onClick={() => handleSpeciesChange('Poopybutthole')}
              >
                Poopybutthole
              </button>
              <button 
                className={`filter-pill ${filters.species === 'Mythological Creature' ? 'active' : ''}`}
                onClick={() => handleSpeciesChange('Mythological Creature')}
              >
                Criatura Mitológica
              </button>
              <button 
                className={`filter-pill ${filters.species === 'Animal' ? 'active' : ''}`}
                onClick={() => handleSpeciesChange('Animal')}
              >
                Animal
              </button>
              <button 
                className={`filter-pill ${filters.species === 'Robot' ? 'active' : ''}`}
                onClick={() => handleSpeciesChange('Robot')}
              >
                Robot
              </button>
              <button 
                className={`filter-pill ${filters.species === 'Cronenberg' ? 'active' : ''}`}
                onClick={() => handleSpeciesChange('Cronenberg')}
              >
                Cronenberg
              </button>
            </div>
          </div>
          
          {/* Gender filter */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Género</h3>
            <div className="flex flex-wrap gap-2">
              <button 
                className={`filter-pill ${filters.gender === 'Male' ? 'active' : ''}`}
                onClick={() => handleGenderChange('Male')}
              >
                Masculino
              </button>
              <button 
                className={`filter-pill ${filters.gender === 'Female' ? 'active' : ''}`}
                onClick={() => handleGenderChange('Female')}
              >
                Femenino
              </button>
              <button 
                className={`filter-pill ${filters.gender === 'Genderless' ? 'active' : ''}`}
                onClick={() => handleGenderChange('Genderless')}
              >
                Sin género
              </button>
              <button 
                className={`filter-pill ${filters.gender === 'unknown' ? 'active' : ''}`}
                onClick={() => handleGenderChange('unknown')}
              >
                Desconocido
              </button>
            </div>
          </div>
          
          {/* Status filter */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Estado</h3>
            <div className="flex flex-wrap gap-2">
              <button 
                className={`filter-pill ${filters.status === 'Alive' ? 'active' : ''}`}
                onClick={() => handleStatusChange('Alive')}
              >
                Vivo
              </button>
              <button 
                className={`filter-pill ${filters.status === 'Dead' ? 'active' : ''}`}
                onClick={() => handleStatusChange('Dead')}
              >
                Muerto
              </button>
              <button 
                className={`filter-pill ${filters.status === 'unknown' ? 'active' : ''}`}
                onClick={() => handleStatusChange('unknown')}
              >
                Desconocido
              </button>
            </div>
          </div>
          
          {/* Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={clearAllFilters}
              className="flex-1 border border-gray-300 text-gray-700 font-bold py-3 px-4 rounded-full mt-4 hover:bg-gray-100"
            >
              Limpiar filtros
            </button>
            <button 
              onClick={() => onApply(filters)}
              className="flex-1 bg-rick-green hover:bg-opacity-90 text-white font-bold py-3 px-4 rounded-full mt-4"
            >
              Aplicar filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterModal