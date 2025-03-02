import { FaHeart, FaRegHeart } from 'react-icons/fa'

const CharacterCard = ({ character, isFavorite, toggleFavorite }) => {
  // Extraer el número del episodio del URL
  const getEpisodeNumber = () => {
    if (character.episode && character.episode.length > 0) {
      const episodeUrl = character.episode[0];
      const episodeNumber = episodeUrl.split('/').pop();
      return episodeNumber;
    }
    return 'Desconocido';
  };

  // Get first episode name (for display purposes)
  const getFirstEpisodeName = () => {
    return 'Never Ricking Morty'; // This would normally be fetched from the API
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex">
      {/* Left side - Character image with favorite star */}
      <div className="w-1/3 relative">
        <img 
          src={character.image} 
          alt={character.name} 
          className="w-full h-full object-cover"
        />
        <button 
          className="absolute top-2 left-2 text-white"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(character.id);
          }}
        >
          {isFavorite ? 
            <div className="text-yellow-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
              </svg>
            </div> : 
            <div className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
            </div>
          }
        </button>
      </div>
      
      {/* Right side - Character info */}
      <div className="w-2/3 p-4 flex flex-col">
        {/* Character name and status */}
        <div className="mb-2">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg text-gray-800">{character.name}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${character.status === 'Alive' ? 'bg-rick-green text-white' : character.status === 'Dead' ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700'}`}>
              {character.status === 'Alive' ? 'Vivo' : character.status === 'Dead' ? 'Muerto' : 'Desconocido'}
            </span>
          </div>
          <p className="text-sm text-gray-600">{character.species === 'Human' ? 'Humano' : character.species}</p>
        </div>
        
        {/* Location and first seen info */}
        <div className="mt-auto">
          <div className="text-sm text-gray-500 mb-1">
            <span className="font-medium text-gray-600">Last known location</span>
            <p className="text-gray-700">{character.location.name}</p>
          </div>
          
          <div className="text-sm text-gray-500">
            <span className="font-medium text-gray-600">First seen in</span>
            <p className="text-gray-700">{getFirstEpisodeName()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CharacterCard